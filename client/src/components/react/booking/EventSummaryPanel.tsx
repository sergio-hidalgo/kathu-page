import { Clock, CreditCard, Video } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { strings } from "@/lib/strings";

export type MeetingVendorId = keyof typeof strings.vendors;

// Shape of one item of GET /api/event-types (api_contract_root.md).
// `meetingVendor` mirrors the current settings.meeting_vendor — display only.
// Moves to @kathu/shared (z.infer of the eventType schema) once that package exists.
export type EventTypeSummary = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  durationMinutes: number;
  priceCents: number;
  currency: string;
  meetingVendor: MeetingVendorId;
};

type EventSummaryPanelProps = {
  florapeutaName: string;
  eventType: EventTypeSummary;
  className?: string;
};

// Persistent left panel of the BookingModal (booking-widget skill). From the
// slots step onward it also shows the back button and the chosen date/time line.
export function EventSummaryPanel({
  florapeutaName,
  eventType,
  className,
}: EventSummaryPanelProps) {
  return (
    <aside className={cn("flex flex-col gap-3 p-6 md:p-8", className)}>
      <p className="text-sm text-muted-foreground">{florapeutaName}</p>
      <h2 className="text-2xl leading-tight font-bold text-night">
        {eventType.name}
      </h2>
      {eventType.description && (
        <p className="text-sm leading-relaxed text-night/70">
          {eventType.description}
        </p>
      )}
      <ul className="mt-2 flex flex-col gap-2.5 text-sm font-medium text-night/80">
        <li className="flex items-center gap-2.5">
          <Clock aria-hidden className="size-4 shrink-0 text-brand-lavender" />
          {strings.booking.minutes(eventType.durationMinutes)}
        </li>
        <li className="flex items-center gap-2.5">
          <CreditCard
            aria-hidden
            className="size-4 shrink-0 text-brand-lavender"
          />
          {formatPrice(eventType.priceCents, eventType.currency)}
        </li>
        <li className="flex items-center gap-2.5">
          <Video aria-hidden className="size-4 shrink-0 text-brand-lavender" />
          {strings.vendors[eventType.meetingVendor]}
        </li>
      </ul>
    </aside>
  );
}
