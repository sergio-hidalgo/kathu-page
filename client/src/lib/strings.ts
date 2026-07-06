// UI copy — Spanish, informal "tú". Mirrors the string table in
// workspace/skills/client/skills/ui-components/SKILL.md; new strings are added
// there and here in the same PR. Components import from this module only.

export const strings = {
  nav: {
    terapias: "terapias",
    productos: "productos",
    planes: "planes",
    contacto: "contacto",
  },
  cta: {
    book: "Reserva tu consulta",
  },
  booking: {
    title: "Selecciona fecha y hora",
    detailsTitle: "Tus datos",
    name: "Nombre",
    email: "Email",
    notes: "Notas adicionales",
    notesPlaceholder: "Cuéntanos lo que nos ayude a preparar la sesión.",
    pet: "¿Para quién es la consulta?",
    next: "Siguiente",
    submit: "Reservar sesión",
    scheduled: "Tu sesión está reservada",
    scheduledBody: "Hemos creado tu reunión correctamente.",
    copyLink: "Copiar enlace",
    join: {
      google_meet: "Unirse a Google Meet",
      zoom: "Unirse a Zoom",
    },
    slotTaken:
      "La franja seleccionada ya no está disponible. Elige otra, por favor.",
    minutes: (n: number) => `${n} minutos`,
    close: "Cerrar",
    back: "Volver",
    prevMonth: "Mes anterior",
    nextMonth: "Mes siguiente",
  },
  vendors: {
    google_meet: "Google Meet",
    zoom: "Zoom",
  },
  auth: {
    signInTitle: "Accede para completar tu reserva",
  },
  errors: {
    generic: "Algo no ha ido bien. Inténtalo de nuevo.",
  },
  contact: {
    title: "comenta tu caso",
  },
  sections: {
    queResuelve: "la terapia floral te puede ayudar...",
    casos: "resultados que hablan",
    productos: "los productos preferidos",
    planes: "elige tu plan",
  },
} as const;
