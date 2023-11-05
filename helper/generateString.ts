let counter = 0;

export function generateUniqueRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-[]{}|;:,<>/';
  let result = '';
  const charactersLength = characters.length;
  
  const timestamp = Date.now().toString(16);
  const uniqueId = (counter++ % 0x100000).toString(16).padStart(5, "0");
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    const randomChar = characters.charAt(randomIndex);
    if (randomChar !== '.' && !result.includes(randomChar)) {
      result += randomChar;
    } else {
      i--; 
    }
  }
  
  return timestamp + uniqueId + result;
}