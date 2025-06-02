```markdown
# IonicNews - App de Conversão de Moedas

IonicNews é um aplicativo móvel desenvolvido com o framework Ionic para conversão de moedas em tempo real. Ele consome dados de APIs REST externas (como a ExchangeRate-API) para fornecer taxas de câmbio atualizadas, permitindo aos usuários realizar conversões entre diversas moedas globais. O aplicativo também armazena um histórico de conversões e oferece funcionalidade offline básica utilizando as últimas taxas sincronizadas.

**Plataforma Alvo:** Android (com possibilidade de extensão para iOS)

## Funcionalidades Principais

* Conversão de valores entre múltiplas moedas.
* Taxas de câmbio atualizadas em tempo real via API.
* Seleção de moeda de origem e destino.
* Interface de usuário responsiva e intuitiva.
* Histórico de conversões recentes armazenado localmente.
* Suporte a uma ampla variedade de moedas.
* Atualização automática de taxas ao abrir o app ou realizar nova conversão.
* Uso de taxas armazenadas localmente em modo offline.

### Pré-requisitos

Antes de começar, garanta que você tem os seguintes softwares instalados:

* [Node.js](https://nodejs.org/) (versão LTS recomendada) - inclui npm.
* [Ionic CLI](https://ionicframework.com/docs/cli): `npm install -g @ionic/cli`
* [Git](https://git-scm.com/)
* (Opcional, para builds nativos) [Android Studio](https://developer.android.com/studio) para Android.
* (Opcional, para builds nativos) Xcode (macOS) para iOS.

### Obtendo uma Chave de API

O aplicativo utiliza a [ExchangeRate-API](https://www.exchangerate-api.com/) para buscar as taxas de câmbio.
1.  Registre-se no site para obter uma chave de API gratuita.
2.  Após obter a chave, você precisará configurá-la no projeto.

### Passos para Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/renanmiranda99/ionicnews.git](https://github.com/renanmiranda99/ionicnews.git)
    cd IonicNews
    ```

2.  **Configure a API Key:**
    Copie sua chave da ExchangeRate-API para os arquivos:
    * `ionicnewsapp/currency-converter/src/environments/environment.ts`
    * `ionicnewsapp/currency-converter/src/environments/environment.prod.ts`

    Exemplo (`environment.ts`):
    ```typescript
    export const environment = {
      production: false,
      exchangeRateApiKey: 'SUA_CHAVE_API_AQUI'
    };
    ```

3.  **Navegue até a pasta do aplicativo Ionic e instale as dependências:**
    ```bash
    cd ionicnewsapp/currency-converter
    npm install
    ```

4.  **Execute o comando para instalar o ionic:**
    ```bash
    npm install -g @ionic/cli
    ```

5.  **Execute o aplicativo no navegador (para desenvolvimento):**
    ```bash
    ionic serve
    ```
    O aplicativo estará disponível em `http://localhost:8100`.

6.  **(Opcional) Para build e execução em dispositivos/emuladores Android:**
    ```bash
    # Adicionar plataforma Android (apenas na primeira vez)
    ionic capacitor add android

    # Sincronizar o projeto web com o nativo
    npx cap sync

    # Abrir o projeto no Android Studio
    npx cap open android
    ```
    No Android Studio, você pode compilar e executar o aplicativo em um emulador ou dispositivo conectado.

## Fluxo de Trabalho no Repositório

Utilizamos um fluxo de trabalho baseado em branches para desenvolvimento. Novas funcionalidades e correções são desenvolvidas em branches separados e, após revisão, são mescladas ao branch `main`.

## Ferramentas e Tecnologias

* **Framework:** Ionic (com Angular)
* **Linguagem:** TypeScript, HTML, SCSS
* **Plataforma Nativa:** Capacitor
* **API de Conversão:** [ExchangeRate-API](https://www.exchangerate-api.com/)
* **Armazenamento Local:** Capacitor Preferences (JSON)
* **Controle de Versão:** Git & GitHub

Contribuições são muito bem-vindas! Por favor, leia nosso [Guia de Contribuição](./CONTRIBUTING.md) para saber como você pode nos ajudar.

## Autores

* [Renan Argôlo Carvalho Miranda] - Scrum Master
* [Renan Argôlo Carvalho Miranda] - Gerente de Configuração
* [Renan Argôlo Carvalho Miranda] - Documentador
* [Renan Argôlo Carvalho Miranda] - Desenvolvedor

## Por causa da má comunicação de um colega que afirmou que eu fazia parte de seu grupo e que outro colega já tinha feito praticamente tudo, mas não fazia parte do grupo, precisei fazer sozinho de última hora e infelizmente faltando alguns requisitos, pois o único grupo que se comunicou disponível aparentemente não estava se importando com o projeto.

## Desde já agradeço a compreensão.


## Licença

Este projeto está licenciado sob a Licença Creative Commons ionicnews © 2025 by Renan Miranda is licensed under CC BY-NC-ND 4.0. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
