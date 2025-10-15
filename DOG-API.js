btnShowInfo.addEventListener('click', () => {
  if (!currentBreed || currentBreed === 'desconhecida') {
    info.textContent = 'Informações da raça não disponíveis.';
    return;
  }

  const mainBreed = currentBreed.split('-')[0]; // Pega só a raça principal

  fetch(`https://api.thedogapi.com/v1/breeds/search?q=${mainBreed}`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        info.textContent = 'Informações da raça não disponíveis.';
        return;
      }
      const breedInfo = data[0];
      let text = `<strong>${breedInfo.name}</strong><br>`;
      if(breedInfo.temperament) text += `<strong>Temperamento:</strong> ${breedInfo.temperament}<br>`;
      if(breedInfo.origin) text += `<strong>Origem:</strong> ${breedInfo.origin}<br>`;
      if(breedInfo.life_span) text += `<strong>Expectativa de vida:</strong> ${breedInfo.life_span}<br>`;
      info.innerHTML = text;
      const msg = new SpeechSynthesisUtterance(`Informações sobre a raça ${breedInfo.name}: ${breedInfo.temperament || ''}`);
      window.speechSynthesis.speak(msg);
    })
    .catch(() => {
      info.textContent = 'Erro ao carregar informações da raça.';
    });
});
