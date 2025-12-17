import { useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff, User, Lock } from "lucide-react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your new password"),
  })
  .refine((val) => val.newPassword === val.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const AccountSettings = () => {
  const { user } = useAdmin();
  const { toast } = useToast();

  // Email state
  const [newEmail, setNewEmail] = useState("");
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [emailErrors, setEmailErrors] = useState<{ email?: string }>({});

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailErrors({});

    const result = emailSchema.safeParse({ email: newEmail });
    if (!result.success) {
      const fieldErrors: { email?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
      });
      setEmailErrors(fieldErrors);
      return;
    }

    setIsUpdatingEmail(true);

    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      toast({
        title: "Failed to update email",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // Also update the admin_users table
      if (user?.id) {
        await supabase
          .from("admin_users")
          .update({ email: newEmail })
          .eq("id", user.id);
      }

      toast({
        title: "Email update initiated",
        description: "Check your new email inbox to confirm the change.",
      });
      setNewEmail("");
    }

    setIsUpdatingEmail(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrors({});

    const result = passwordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors: {
        currentPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
      } = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field as keyof typeof fieldErrors] = err.message;
      });
      setPasswordErrors(fieldErrors);
      return;
    }

    setIsUpdatingPassword(true);

    // First verify current password by attempting to sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user?.email || "",
      password: currentPassword,
    });

    if (signInError) {
      setPasswordErrors({ currentPassword: "Current password is incorrect" });
      setIsUpdatingPassword(false);
      return;
    }

    // Update to new password
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast({
        title: "Failed to update password",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    setIsUpdatingPassword(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Account Settings
        </h1>
        <p className="text-muted-foreground font-body mt-1">
          Manage your admin email and password
        </p>
      </div>

      <div className="grid gap-8 max-w-xl">
        {/* Update Email Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Update Email
              </h2>
              <p className="text-sm text-muted-foreground">
                Current: {user?.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newEmail">New Email Address</Label>
              <Input
                id="newEmail"
                type="email"
                placeholder="Enter new email address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="h-11"
                disabled={isUpdatingEmail}
              />
              {emailErrors.email && (
                <p className="text-destructive text-sm">{emailErrors.email}</p>
              )}
            </div>

            <Button type="submit" disabled={isUpdatingEmail || !newEmail}>
              {isUpdatingEmail ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Email"
              )}
            </Button>
          </form>
        </div>

        {/* Update Password Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Change Password
              </h2>
              <p className="text-sm text-muted-foreground">
                Update your admin password
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords ? "text" : "password"}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-11 pr-10"
                  disabled={isUpdatingPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPasswords ? "Hide passwords" : "Show passwords"}
                >
                  {showPasswords ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-destructive text-sm">
                  {passwordErrors.currentPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type={showPasswords ? "text" : "password"}
                placeholder="Enter new password (min 8 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11"
                disabled={isUpdatingPassword}
              />
              {passwordErrors.newPassword && (
                <p className="text-destructive text-sm">
                  {passwordErrors.newPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type={showPasswords ? "text" : "password"}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11"
                disabled={isUpdatingPassword}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-destructive text-sm">
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={
                isUpdatingPassword ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword
              }
            >
              {isUpdatingPassword ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
