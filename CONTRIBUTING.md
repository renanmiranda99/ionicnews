# Como Contribuir para o IonicNews

Agradecemos o seu interesse em contribuir para o projeto IonicNews! Seja reportando bugs, sugerindo novas funcionalidades, ou enviando código, sua ajuda é muito bem-vinda.

## Descrição do Projeto

O IonicNews é um projeto que visa desenvolver um aplicativo móvel de conversão de moedas em tempo real utilizando o framework Ionic. O aplicativo consumirá dados de APIs REST externas para obter taxas de câmbio atualizadas, permite ao usuário selecionar moedas de origem e destino, armazena um histórico de conversões e oferece funcionalidades offline.

## Como Baixar o Repositório

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/renanmiranda99/IonicNews.git](https://github.com/renanmiranda99/IonicNews.git)
    ```
2.  **Navegue até a pasta do projeto Ionic:**
    ```bash
    cd IonicNews/ionicnewsapp/currency-converter
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Rode o ambiente de desenvolvimento:**
    ```bash
    ionic serve
    ```

## Pré-requisitos

Para contribuir com o desenvolvimento do aplicativo Ionic, você precisará ter instalado:

* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)
* [Git](https://git-scm.com/)
* Um editor de código de sua preferência (ex: VS Code)
* (Opcional) Android Studio para build e emulação Android.
* (Opcional) Xcode para build e emulação iOS (requer macOS).

**API Key:**
Para a funcionalidade de conversão de moedas, você precisará de uma chave da API [ExchangeRate-API](https://www.exchangerate-api.com/).
Após obter a chave, adicione-a aos arquivos:
* `IonicNews/ionicnewsapp/currency-converter/src/environments/environment.ts`
* `IonicNews/ionicnewsapp/currency-converter/src/environments/environment.prod.ts`

No seguinte formato:
```typescript
export const environment = {
  production: false, // ou true para prod.ts
  exchangeRateApiKey: 'SUA_CHAVE_API_AQUI'
};