document.addEventListener('DOMContentLoaded', () => {
  const ALPHABET_ARRAY_UPPERCASE = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M',
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
  ];

  const inputOriginal = document.getElementById('input-original');
  const cipher = document.getElementById('cipher');
  const result = document.getElementById('result');
  const rank = document.getElementById('rank');

  const shifMessage = () => {
    const wordArray = [...inputOriginal.value.toUpperCase()];
    result.innerHTML = '';
    printChar(0, wordArray);
  };

  const printChar = async (currentLetterIndex, wordArray) => {
    if (currentLetterIndex >= wordArray.length) return;

    // Opcional: ir “consumiendo” el input visualmente
    inputOriginal.value = inputOriginal.value.substring(1);

    const spanChar = document.createElement('span');
    result.appendChild(spanChar);

    // Animación de letras aleatorias
    await animeChar(spanChar);

    const charSinCodificar = wordArray[currentLetterIndex];
    const shift = parseInt(rank.value, 10) || 0;

    const idx = ALPHABET_ARRAY_UPPERCASE.indexOf(charSinCodificar);
    const charCodificado = idx !== -1
      ? ALPHABET_ARRAY_UPPERCASE[
          (idx + shift + ALPHABET_ARRAY_UPPERCASE.length) % ALPHABET_ARRAY_UPPERCASE.length
        ]
      : charSinCodificar; // mantener espacios, números, signos

    spanChar.textContent = charCodificado;

    // Pasar al siguiente carácter después de terminar la animación y mostrar el codificado
    printChar(currentLetterIndex + 1, wordArray);
  };

  const animeChar = spanChar => {
    let cambiosDeLetra = 0;
    return new Promise(resolve => {
      const interval = setInterval(() => {
        spanChar.innerHTML = ALPHABET_ARRAY_UPPERCASE[
          Math.floor(Math.random() * ALPHABET_ARRAY_UPPERCASE.length)
        ];
        cambiosDeLetra++;
        if (cambiosDeLetra === 3) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  };

  const submit = (e) => {
    e.preventDefault();
    shifMessage();
  };

  if (cipher) cipher.onsubmit = submit;
});
