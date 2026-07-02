import * as ics from "ics";

export function generateCalendarFile() {
  const event = {
    start: [2026, 7, 3, 9, 0], // July 3, 2026, 9:00 AM (Dignitary ceremony)
    end: [2026, 7, 9, 18, 0],   // July 9, 2026, 6:00 PM (End of public mourning)
    title: "State Funeral & Mourning Period - Sayyid Ali Khamenei",
    description: "Official state ceremonies spanning Tehran, Qom, and Mashhad. Dignitary ceremony begins July 3, followed by public processions July 4-9.",
    location: "Tehran, Iran",
    url: "https://khamenei-tribute.example.com", // Site owner should update this
    status: "CONFIRMED",
    busyStatus: "BUSY"
  };

  return new Promise((resolve, reject) => {
    ics.createEvent(event, (error, value) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(value);
    });
  });
}
