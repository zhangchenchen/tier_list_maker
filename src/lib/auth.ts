export function isAuthEnabled(): boolean {
  return (
    !!(
      process.env.NEXT_PUBLIC_AUTH_ENABLED === "true" ||
      process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true" ||
      process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === "true" ||
      process.env.NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED === "true"
    ) && !!(process.env.NEXT_PUBLIC_AUTH_ENABLED !== "false")
  );
}

export function isGoogleAuthEnabled(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true" &&
    process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID
  );
}

export function isGitHubAuthEnabled(): boolean {
  return process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === "true";
}

export function isGoogleOneTapEnabled(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED === "true" &&
    process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID
  );
}
