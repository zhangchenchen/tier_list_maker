export default function Plausible() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleScriptUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL;

  if (!plausibleDomain || !plausibleScriptUrl) {
    return null;
  }

  return (
    <script
      defer
      data-domain={plausibleDomain}
      src={plausibleScriptUrl}
    ></script>
  );
}
