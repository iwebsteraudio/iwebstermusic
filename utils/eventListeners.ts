export const konamiCodeListener = (
  allowedKeys: Record<number, string>,
  konamiCode: string[],
  onComplete: () => void
) => {
  let position = 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = allowedKeys[e.keyCode];
    const requiredKey = konamiCode[position];

    if (key === requiredKey) {
      position++;

      if (position === konamiCode.length) {
        onComplete();
        position = 0;
      } 
    }
  };

  return {
    attach: () => document.addEventListener("keydown", handleKeyDown),
    detach: () => document.removeEventListener("keydown", handleKeyDown),
  };
};

export const tapListener = (tapThreshold: number, onComplete: ()=> void) => {
    let tapCount = 0;
    let tapTimer: NodeJS.Timeout | null = null;

    const handleTap = () => {
        tapCount ++;
        if (tapCount === tapThreshold) {
            onComplete();
            tapCount = 0;
        }
        if (tapTimer) clearTimeout(tapTimer)

            tapTimer = setTimeout(()=>{
                tapCount = 0;
            }, 1000) // Resets after a second
    }

    return {
        attach: (element: HTMLElement) => element.addEventListener("click", handleTap),
        detach: (element: HTMLElement) => element.removeEventListener("click", handleTap)
    }
}