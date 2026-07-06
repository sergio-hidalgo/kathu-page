import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { DayButton } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/react/ui/calendar";
import { Skeleton } from "@/components/react/ui/skeleton";
import { strings } from "@/lib/strings";

type CalendarStepProps = {
  month: Date;
  onMonthChange: (month: Date) => void;
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  isDayAvailable: (date: Date) => boolean;
  /** First navigable month (prev chevron disabled before it). */
  startMonth: Date;
  /** Last navigable month (next chevron disabled past it — maxHorizonDays). */
  endMonth: Date;
  /** Skeleton state for the availability query (booking-widget skill). */
  isLoading?: boolean;
};

// Step 1 of the BookingModal: month grid, ES locale, week starting on Sunday
// to mirror the reference layout (01.calendar.png). Day states per the
// booking-widget skill: available → circular brand tint, selected → solid
// brand, unavailable → muted and not clickable, today → dot under the number.
export function CalendarStep({
  month,
  onMonthChange,
  selected,
  onSelect,
  isDayAvailable,
  startMonth,
  endMonth,
  isLoading = false,
}: CalendarStepProps) {
  if (isLoading) return <CalendarSkeleton />;

  return (
    <Calendar
      mode="single"
      locale={es}
      weekStartsOn={0}
      showOutsideDays={false}
      month={month}
      onMonthChange={onMonthChange}
      selected={selected}
      onSelect={onSelect}
      startMonth={startMonth}
      endMonth={endMonth}
      disabled={(date) => !isDayAvailable(date)}
      modifiers={{ available: isDayAvailable }}
      labels={{
        labelPrevious: () => strings.booking.prevMonth,
        labelNext: () => strings.booking.nextMonth,
      }}
      formatters={{
        // "julio 2026" — lowercase, per the booking-widget skill
        formatCaption: (date) => format(date, "LLLL yyyy", { locale: es }),
        // DOM LUN MAR MIÉ JUE VIE SÁB
        formatWeekdayName: (date) =>
          format(date, "EEEE", { locale: es }).slice(0, 3).toUpperCase(),
      }}
      className="w-full p-0 [--cell-size:--spacing(11)]"
      classNames={{
        root: "w-full",
        caption_label: "text-base font-semibold text-night select-none",
        button_previous:
          "inline-flex size-9 items-center justify-center rounded-full text-brand-lavender transition-colors outline-none select-none hover:bg-brand/10 hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/40 disabled:pointer-events-none disabled:opacity-30",
        button_next:
          "inline-flex size-9 items-center justify-center rounded-full text-brand transition-colors outline-none select-none hover:bg-brand/10 focus-visible:ring-2 focus-visible:ring-brand/40 disabled:pointer-events-none disabled:opacity-30",
        weekday: "flex-1 text-xs font-medium tracking-wide text-night/50 select-none",
        // today is marked only by the dot in KathuDayButton, not a filled cell
        today: "bg-transparent",
      }}
      components={{ DayButton: KathuDayButton }}
    />
  );
}

function KathuDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      type="button"
      data-day={format(day.date, "yyyy-MM-dd")}
      data-selected={modifiers.selected || undefined}
      className={cn(
        "relative mx-auto flex size-10 items-center justify-center rounded-full text-sm transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-brand/40",
        modifiers.disabled && "text-night/35",
        modifiers.available &&
          !modifiers.selected &&
          "bg-brand/10 font-semibold text-brand hover:bg-brand/20",
        modifiers.selected && "bg-brand font-semibold text-white",
        modifiers.today &&
          "after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-brand after:content-['']",
        className,
      )}
      {...props}
    />
  );
}

function CalendarSkeleton() {
  return (
    <div aria-hidden className="w-full">
      <div className="flex items-center justify-between px-1">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="h-5 w-28 rounded-md" />
        <Skeleton className="size-9 rounded-full" />
      </div>
      <div className="mt-4 grid grid-cols-7 gap-y-3">
        {Array.from({ length: 35 }).map((_, i) => (
          <Skeleton key={i} className="mx-auto size-10 rounded-full" />
        ))}
      </div>
    </div>
  );
}
