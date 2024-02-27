import { useEffect, useState } from "react";

const useTriggerPwaInstallPrompt = () => {
  const [promptEvent, setPromptEvent] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setPromptEvent(event);
    };

    const handleAppInstalled = () => {
      setPromptEvent(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptToInstall = () => {
    if (promptEvent) {
      promptEvent.prompt();
    }
  };

  return { promptToInstall };
};

export default useTriggerPwaInstallPrompt;
