/** URL de una clase: /clase/04. El número va con dos dígitos para que ordene bien. */
export const lessonHref = (lessonNumber: number) =>
  `/clase/${String(lessonNumber).padStart(2, "0")}`;
