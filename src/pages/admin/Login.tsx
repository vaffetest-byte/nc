import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, Loader2, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const resetSchema = z
  .object({
    password: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your new password"),
  })
  .refine((val) => val.password === val.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSettingNewPassword, setIsSettingNewPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const { signIn, signUp, user, isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user && isAdmin && !isSettingNewPassword) {
      navigate("/admin");
    }
  }, [user, isAdmin, loading, navigate, isSettingNewPassword]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsSettingNewPassword(true);
        setIsForgotPassword(false);
        setIsSignUp(false);
        setPassword("");
        setConfirmPassword("");
        setErrors({});
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Handle password recovery flow (user clicked the email link)
    if (isSettingNewPassword) {
      const result = resetSchema.safeParse({ password, confirmPassword });
      if (!result.success) {
        const fieldErrors: { password?: string; confirmPassword?: string } = {};
        result.error.errors.forEach((err) => {
          if (err.path[0] === "password") fieldErrors.password = err.message;
          if (err.path[0] === "confirmPassword") fieldErrors.confirmPassword = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        toast({
          title: "Could not update password",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "Password updated",
        description: "You can now continue to the admin console.",
      });
      setIsSettingNewPassword(false);
      setIsLoading(false);
      return;
    }

    // Handle forgot password (send reset email via custom SMTP)
    if (isForgotPassword) {
      const trimmedEmail = email.trim();
      if (!trimmedEmail || !z.string().email().safeParse(trimmedEmail).success) {
        setErrors({ email: "Please enter a valid email address" });
        return;
      }

      setIsLoading(true);
      
      try {
        // Generate the password reset token using Supabase
        const { data, error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
          redirectTo: `${window.location.origin}/admin/login`,
        });
        
        if (error) {
          throw error;
        }

        toast({
          title: "Password Reset Email Sent",
          description:
            "Check your inbox for a password reset link from noreply@ncaclaim.com. If it doesn't arrive in a few minutes, check spam or try again.",
        });
        setIsForgotPassword(false);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
      return;
    }

    // Validate input
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    if (isSignUp) {
      const { data, error } = await signUp(email, password);
      
      if (error) {
        setIsLoading(false);
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data?.user) {
        // Add to admin_users table
        const { error: insertError } = await supabase
          .from("admin_users")
          .insert({ id: data.user.id, email: data.user.email });

        if (insertError) {
          toast({
            title: "Account Created",
            description: "Account created but admin access failed. Contact support.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Admin Account Created!",
            description: "You can now sign in with your credentials.",
          });
          setIsSignUp(false);
        }
      }
      setIsLoading(false);
      return;
    }

    const { error } = await signIn(email, password);

    if (error) {
      setIsLoading(false);
      toast({
        title: "Login Failed",
        description: error.message === "Invalid login credentials" 
          ? "Invalid email or password. Please try again."
          : error.message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {isSettingNewPassword
                ? "Set New Password"
                : isForgotPassword
                  ? "Reset Password"
                  : isSignUp
                    ? "Create Admin Account"
                    : "Admin Login"}
            </h1>
            <p className="text-muted-foreground font-body mt-2">
              {isSettingNewPassword
                ? "Choose a new password to finish resetting your account"
                : isForgotPassword
                  ? "Enter your email to receive a reset link"
                  : isSignUp
                    ? "Set up your admin credentials"
                    : "Sign in to access the admin console"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isSettingNewPassword && (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email}</p>
                )}
              </div>
            )}

            {!isForgotPassword && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    {isSettingNewPassword ? "New Password" : "Password"}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={
                        isSettingNewPassword
                          ? "Enter a new password"
                          : "Enter your password"
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pr-10"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-sm">{errors.password}</p>
                  )}
                </div>

                {isSettingNewPassword && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12"
                      disabled={isLoading}
                    />
                    {errors.confirmPassword && (
                      <p className="text-destructive text-sm">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}
              </>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  {isSettingNewPassword
                    ? "Updating..."
                    : isForgotPassword
                      ? "Sending..."
                      : isSignUp
                        ? "Creating Account..."
                        : "Signing in..."}
                </>
              ) : isSettingNewPassword ? (
                "Update Password"
              ) : isForgotPassword ? (
                "Send Reset Link"
              ) : isSignUp ? (
                "Create Admin Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            {!isSettingNewPassword && !isForgotPassword && !isSignUp && (
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(true);
                  setIsSignUp(false);
                  setPassword("");
                  setConfirmPassword("");
                  setErrors({});
                }}
                className="text-sm text-muted-foreground hover:text-primary block w-full"
              >
                Forgot your password?
              </button>
            )}

            {isSettingNewPassword ? (
              <button
                type="button"
                onClick={() => {
                  setIsSettingNewPassword(false);
                  setPassword("");
                  setConfirmPassword("");
                  setErrors({});
                }}
                className="text-sm text-primary hover:underline"
              >
                ← Back to sign in
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (isForgotPassword) {
                    setIsForgotPassword(false);
                    setIsSignUp(false);
                    setErrors({});
                    return;
                  }

                  setIsSignUp(!isSignUp);
                }}
                className="text-sm text-primary hover:underline"
              >
                {isForgotPassword
                  ? "← Back to sign in"
                  : isSignUp
                    ? "Already have an account? Sign in"
                    : "Need an admin account? Sign up"}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="hover:text-primary transition-colors">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
