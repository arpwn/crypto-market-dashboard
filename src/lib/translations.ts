export type Language = "es" | "en";
export const translations: Record<Language, Record<string, string>> = {
  en: {
    "Last {0} days": "Last {0} days",
    "ACTIVIDAD / USD": "ACTIVITY / USD",
    "Consulta de datos históricos": "Historical data query",
    "Consultando precio y volumen de": "Fetching price and volume for",
    "Código ↗": "Source code ↗",
    "DATOS DE COINGECKO": "DATA FROM COINGECKO",
    "EVOLUCIÓN / USD": "PRICE HISTORY / USD",
    "El mercado,": "The market,",
    Estado: "Status",
    "Estado de {0}": "Status of {0}",
    "Fuente: CoinGecko ↗": "Source: CoinGecko ↗",
    "MERCADO / EXPLORADOR": "MARKET / EXPLORER",
    "Moneda de referencia": "Reference currency",
    "No hay datos para este periodo.": "No data for this period.",
    "No pudimos cargar el mercado.": "We could not load market data.",
    "Precio y volumen histórico, con el contexto de cada periodo.":
      "Historical price and volume, with context for every period.",
    "Reintentar consulta": "Try again",
    "Resumen del periodo": "Period summary",
    "Selecciona otra moneda o cambia el rango de fechas.":
      "Select another coin or change the date range.",
    "Variación del periodo": "Period change",
    de: "of",
    "días · USD": "days · USD",
    "en perspectiva.": "in perspective.",
    "observaciones de precio · Último dato:":
      "price observations · Latest data:",
    "· Los valores reflejan la cobertura y frecuencia de la fuente.":
      "· Values reflect the coverage and frequency of the source.",
    Área: "Department",
    "Última consulta: {0}": "Last fetched: {0}",
    "Último precio disponible": "Latest available price",
    "Último volumen disponible": "Latest available volume",
    "↻ Actualizar": "↻ Refresh",
    "La fuente alcanzó su límite de consultas. Espera un momento y reintenta.":
      "The data source reached its request limit. Wait a moment and try again.",
    "No pudimos consultar los datos del mercado.":
      "We could not fetch market data.",
    "La fuente devolvió una respuesta inesperada.":
      "The data source returned an unexpected response.",
    "La fuente devolvió datos incompletos.":
      "The data source returned incomplete data.",
    "La fuente tardó demasiado en responder. Intenta de nuevo.":
      "The data source took too long to respond. Try again.",
    "No pudimos conectar con la fuente.":
      "We could not connect to the data source.",
    Precio: "Price",
    Volumen: "Volume",
    "Bar chart showing trading volume over time":
      "Bar chart showing trading volume over time",
    "Crypto Market Dashboard": "Crypto Market Dashboard",
    Cryptocurrency: "Cryptocurrency",
    "Dashboard filters": "Dashboard filters",
    "Date range": "Date range",
    Last: "Last",
    "Line chart showing cryptocurrency price over time":
      "Line chart showing cryptocurrency price over time",
    "Loading data…": "Loading data…",
    "Price over time": "Price over time",
    "This chart displays the price evolution of the selected cryptocurrency across the selected time range.":
      "This chart displays the price evolution of the selected cryptocurrency across the selected time range.",
    "This chart displays the trading volume of the selected cryptocurrency over the selected time period.":
      "This chart displays the trading volume of the selected cryptocurrency over the selected time period.",
    "Trading Volume": "Trading Volume",
    days: "days",
  },
  es: {
    "Last {0} days": "Últimos {0} días",
    Cryptocurrency: "Criptomoneda",
    "Date range": "Periodo",
    "Dashboard filters": "Filtros del mercado",
    Last: "Últimos",
    days: "días",
    "Loading data…": "Cargando datos…",
    "Price over time": "Evolución del precio",
    "Trading Volume": "Volumen de operaciones",
    "Line chart showing cryptocurrency price over time":
      "Gráfica de líneas del precio a lo largo del tiempo",
    "Bar chart showing trading volume over time":
      "Gráfica de barras del volumen a lo largo del tiempo",
    "This chart displays the price evolution of the selected cryptocurrency across the selected time range.":
      "Esta gráfica muestra la evolución del precio de la criptomoneda seleccionada en el periodo elegido.",
    "This chart displays the trading volume of the selected cryptocurrency over the selected time period.":
      "Esta gráfica muestra el volumen de operaciones de la criptomoneda seleccionada en el periodo elegido.",
  },
};
export function translate(
  value: string | number | null | undefined,
  lang: Language,
  parameters: (string | number)[] = [],
): string {
  const key = String(value ?? "");

  const text = translations[lang][key] ?? key;
  return text.replace(/\{(\d+)\}/g, (token, index) =>
    parameters[Number(index)] === undefined
      ? token
      : String(parameters[Number(index)]),
  );
}
