import * as React from "react";
import { addDays, addHours, endOfDay, startOfMonth } from "date-fns";
import { XIcon } from "lucide-react";

import { Button } from "@/components/react/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/react/ui/dialog";
import { Separator } from "@/components/react/ui/separator";
import { strings } from "@/lib/strings";
import { CalendarStep } from "./CalendarStep";
import {
  EventSummaryPanel,
  type EventTypeSummary,
} from "./EventSummaryPanel";

// ─── DRAFT PLACEHOLDERS ──────────────────────────────────────────────────────
// Everything in this block is mock data for the step-1 draft. It gets replaced
// by TanStack Query hooks (lib/queries.ts) once lib/api.ts and the server exist:
//   - event type + price + vendor → useQuery(queryKeys.eventTypes)      GET /api/event-types
//   - month availability          → useQuery(queryKeys.availability(…)) GET /api/availability
//   - notice/horizon come back encoded in that response (out-of-range days are
//     simply not available); the constants below only shape the mock.
// Price is NEVER hard-coded in the real component (client constraint #4).

const MOCK_EVENT_TYPE: EventTypeSummary = {
  id: "draft-event-type",
  slug: "consulta-terapia-floral",
  name: "Consulta de terapia floral",
  description:
    "Una sesión online para conocer tu caso y el de tu familia multiespecie, y preparar un plan a medida.",
  durationMinutes: 45,
  priceCents: 7500,
  currency: "EUR",
  meetingVendor: "google_meet",
};

const MOCK_FLORAPEUTA = "kathu";

const MIN_NOTICE_HOURS = 12; // settings.min_notice_hours
const MAX_HORIZON_DAYS = 60; // settings.max_horizon_days

// Mirrors the availability_rules semantics at day granularity: mock weekly
// windows on martes–viernes, filtered by notice and horizon.
function isDayAvailableMock(date: Date): boolean {
  const weekday = date.getDay(); // 0 = domingo
  if (weekday < 2 || weekday > 5) return false;
  const now = new Date();
  if (endOfDay(date) < addHours(now, MIN_NOTICE_HOURS)) return false;
  if (date > endOfDay(addDays(now, MAX_HORIZON_DAYS))) return false;
  return true;
}
// ─── END DRAFT PLACEHOLDERS ──────────────────────────────────────────────────

// BookingModal — step 1 (calendar) draft. Two-panel card per the booking-widget
// skill and workspace/ui-reference/book-modal/01.calendar.png: persistent event
// summary on the left, current step on the right. Radix Dialog provides
// centering, focus trap, Esc, body scroll lock, and close-on-overlay-click.
// Flow state (step/date/slot) moves to the Zustand booking store when the
// slots step lands; for the single-step draft it is local state.
export default function BookingModal() {
  const today = React.useMemo(() => new Date(), []);
  const [month, setMonth] = React.useState<Date>(() => startOfMonth(today));
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  // Closing resets the step selection but keeps the month (store spec).
  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedDate(undefined);
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-auto rounded-full bg-brand-deep px-7 py-1.5 text-lg font-light text-white transition-colors hover:bg-brand-lavender hover:text-brand-deep">
          {strings.cta.book}
        </Button>
      </DialogTrigger>
      <DialogContent
        // Semi-transparent white blinder between the modal and the page.
        overlayClassName="bg-white/80 supports-backdrop-filter:backdrop-blur-sm"
        className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-2xl bg-white p-0 text-night shadow-[0_8px_30px_rgb(0_0_0/0.12)] sm:max-w-3xl"
        showCloseButton={false}
        aria-modal="true"
        aria-describedby={undefined}
      >
        <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <EventSummaryPanel
            florapeutaName={MOCK_FLORAPEUTA}
            eventType={MOCK_EVENT_TYPE}
            className="md:border-r md:border-brand-lavender/30"
          />
          <Separator className="bg-brand-lavender/30 md:hidden" />
          <section className="flex flex-col gap-5 p-6 md:p-8">
            <DialogTitle className="w-full mx-auto text-xl font-bold text-night text-center">
              {strings.booking.title}
            </DialogTitle>
            <CalendarStep
              month={month}
              onMonthChange={setMonth}
              selected={selectedDate}
              // Selecting a day will advance to the slots step (step 2);
              // in this draft it only records the selection.
              onSelect={setSelectedDate}
              isDayAvailable={isDayAvailableMock}
              startMonth={startOfMonth(today)}
              endMonth={startOfMonth(addDays(today, MAX_HORIZON_DAYS))}
            />
          </section>
        </div>
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-3 right-3 rounded-full text-night/50 hover:bg-brand/10 hover:text-night"
          >
            <XIcon />
            <span className="sr-only">{strings.booking.close}</span>
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
