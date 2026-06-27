const ApiManager = {
  // Utilizando uma URL base pública direta e gratuita para testes rápidos (Open-Meteo)
  async buscarClimaPorCidade(cidade) {
    try {
      // Passo 1: Descobre a latitude e longitude da cidade (Geocoding)
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt`;
      const geoResponse = await fetch(geoUrl); // Fetch API [cite: 76]
      
      if (!geoResponse.ok) throw new Error("Erro na comunicação com o servidor.");
      
      const geoData = await geoResponse.json();
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Cidade não encontrada. Tente novamente.");
      }

      const { latitude, longitude, name } = geoData.results[0];

      // Passo 2: Busca o clima atual com base nas coordenadas obtidas
      const climaUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`;
      const climaResponse = await fetch(climaUrl);
      
      if (!climaResponse.ok) throw new Error("Não foi possível obter os dados do clima.");
      
      const climaData = await climaResponse.json();
      
      // Padroniza o retorno para o nosso app
      return {
        nome: name,
        tempC: climaData.current_weather.temperature,
        vento: climaData.current_weather.windspeed,
        codigoClima: climaData.current_weather.weathercode
      };

    } catch (erro) {
      console.error(erro); // Console amigável para debug [cite: 122, 154]
      throw erro; // Propaga o erro para a interface tratar [cite: 157]
    }
  }
};