export const handleFormSubmit = (
  e: React.FormEvent,
  formData: Record<string, any>
): void => {
  e.preventDefault();
  console.log('Form submission (preview):', formData);
};
