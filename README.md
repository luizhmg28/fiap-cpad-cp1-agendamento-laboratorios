
# Agendamento de laboratórios FIAP

Um simples aplicativo *mobile* para agendar laboratórios na [FIAP](https://www.fiap.com.br), visando facilitar o gerencimento de salas ocupadas e remover barreiras burocráticas que possam atrasar e, eventualmente, inviabilizar o processo.

## Funcionalidades

- Agendamento de laboratórios por:
    - Horário;
    - Dia;
    - Laboratório;
    - Unidade.
- Cancelamento de agendamento;
- Login (apenas uma simulação, já que não foi implementado nenhum back-end);
- Alteração de senha,

## Decisões técnicas

### Estrutura
O projeto foi estruturado para comportar funcionalidades do [Expo](https://expo.dev), conforme mostra a estruta de pastas abaixo:

```
app-router/
|   app/
|   |   (auth)/
|   |   |   _layout.js
|   |   |   login.js
|   |   (perfil)/
|   |   |   _layout.js
|   |   |   trocarSenha.js
|   |   (tabs)/
|   |   |   _layout.js
|   |   |   account.js
|   |   |   agendar.js
|   |   |   home.js
|   |   _layout.js
|   |   index.js
|   assets/
|   context/
|   |   AuthContext.js
|   utils/
|   |   headerLogo.js
|   |   refreshFlag.js
```

### Hooks

Foram utilizados alteradores de estado como `useEffect` e `useState` para validar reservas passadas, renderizar componentes dinamicamente, como os horários passados.

### Navegação

Para navegar pelo aplicativo, o modo principal foi o uso de ***Tabs*** e ***Stacks*** pelo **expo-router**. Aquele foi utilizado para a parte principal do aplicativo (pós-login) e este foi utilizado para mudar telas como a de login e edição de senha.
## Capturas de tela

**Tela de login** \
<img src="./screenshots/login.png" alt="Tela de login" height="500"/>

**Tela inicial** \
<img src="./screenshots/home.png" alt="Tela inicial" height="500"/>

**Tela de agendamentos** \
<img src="./screenshots/agendar.png" alt="Tela de agendamento" height="500"/>

**Tela de perfil** \
<img src="./screenshots/perfil.png" alt="Tela de perfil" height="500"/>

**Tela de alteração de senha** \
<img src="./screenshots/senha.png" alt="Tela de alterar senha" height="500"/>

## Autores

- [Gustavo Hackime Costa](https://www.github.com/IAmIndex)
- [Luiz Henrique Macedo Graça](https://github.com/luizhmg28)


## Apêndice

A escolha de *commits* na *main* foi proposital. A decisão foi tomada para facilitar a correção do *checkpoint* pelo professor corretor.


## Rodar localmente

Clone o projeto

```bash
  git clone https://github.com/luizhmg28/fiap-cpad-cp1-agendamento-laboratorios
```

Vá para o diretório do projeto

```bash
  cd app-router
```

Instale as dependências necessárias

```bash
  npm install
```

Inicie o Expo

```bash
  npm start
```

Para rodar a partir deste ponto, é necessário utilizar um emulador de celular. Utilize aquele de sua preferência. Basta seguir as informações disponíveis [aqui](https://docs.expo.dev/get-started/set-up-your-environment/).

**Importante:** Utilizar o aparelho físico pode não funcionar, já que o Expo está em uma versão mais antiga nas lojas de aplicativos.

## Próximos passos

Considerado o ponto atual do projeto, com mais tempo, a equipe desenvolvedora poderia seguir na implementação de um *back-end* e banco de dados robustos.

Além disso, fazer verificações reais e conexões com o sistema da FIAP para lidar com o perfil do usuário seriam pontos importantes a serem levados em conta.
