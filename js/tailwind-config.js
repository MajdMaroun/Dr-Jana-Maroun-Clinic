tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50:'#eff6ff',100:'#dbeafe',200:'#bfdbfe',300:'#93c5fd',400:'#60a5fa',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8',800:'#1e40af',900:'#1e3a8a' },
        dental: { light:'#e0f2fe', DEFAULT:'#0ea5e9', dark:'#0369a1' },
        mint: { light:'#ecfdf5', DEFAULT:'#10b981', dark:'#047857' }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif']
      }
    }
  }
};