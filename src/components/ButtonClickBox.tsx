import { Click, Clicks } from "@/App";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Constant, SUPPORTED_MOUSE_BUTTONS } from "@/constants";
import { cn } from "@/lib/utils";
import { MousePointerClick } from "lucide-react";
import { toast } from "sonner";

type ButtonClickBoxProps = {
  clicks: Clicks | null;
  onClick: (click: Click) => void;
  threshold: number;
};

export const ButtonClickBox = ({
  threshold,
  clicks,
  onClick,
}: ButtonClickBoxProps) => {
  const onMouseDownHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (SUPPORTED_MOUSE_BUTTONS.includes(e.button)) {
      onClick({
        type: Constant.Mouse.Button[e.button],
        times: Date.now(),
      });
    } else {
      toast.warning("Wrong button!", {
        description: `This button is not supported.`,
      });
    }
  };

  return (
    <div
      className="flex flex-row h-1/2 w-full max-w-4xl max-h-[600px] bg-white dark:bg-black shadow-sm justify-center items-center rounded-4xl"
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={onMouseDownHandler}
    >
      {clicks && clicks?.times.length > 0 ? (
        <div className="flex flex-row justify-between w-full h-full overflow-hidden">
          <div className="flex flex-row gap-2 items-center grow-1 justify-center">
            <span className="text-3xl text-primary font-black">
              {clicks.times.length}
            </span>
            <span>{clicks.type} clicks</span>
          </div>
          <ScrollArea className="px-8 m-2">
            {clicks.times.map((time, index) => {
              if (index > 0) {
                const timeBetweenClicks = clicks.times[index - 1] - time;
                return (
                  <div className="flex flex-row gap-1 items-end">
                    <span
                      className={cn("w-full flex justify-end items-end", {
                        "text-red-600 dark:text-red-500 font-bold text-lg":
                          timeBetweenClicks < threshold,
                      })}
                    >
                      {timeBetweenClicks}
                    </span>
                    <span className="opacity-50 text-sm">ms</span>
                  </div>
                );
              }
            })}
          </ScrollArea>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-8">
          <MousePointerClick className="w-24 h-24 text-primary" />
          <span className="italic">start by clicking here</span>
        </div>
      )}
    </div>
  );
};
