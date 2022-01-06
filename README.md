# Cardápio Fácil

<img src="https://blogger.googleusercontent.com/img/a/AVvXsEiMec3r0jLW2fhqiqXW1S48zxKpMonair3idaNHiZCPQZwN2BdnXy7RT_-0ytAauOOavf4Jqv9j7qFdxrEMM9GVCLhXYEyGjmipHsjRH_CK_c_weYdtMMqjSuWcKpoguUdWlzob213OMeY190Z-K0DhCNlBr3suB2clOqx-Mb6rWHp4lvly3Ry0WPFI" alt="Cardápio Fácil">

> Esse projeto nasceu para colaborar com os comerciantes locais de comidas e bebidas, que precisam divulgar o menu de seus produtos, seja por mídias sociais ou até mesmo por códigos QR, através de um link. O Cardápio Fácil, como o nome já diz, foi projetado para ser fácil. Sua interface é bem simples e organizada, além de incluir um sistema integrado, para a busca de imagens dos produtos!

## :star: Features
- Cadastrar/Entrar com a conta do [Google](https://firebase.google.com/docs/auth/web/google-signin)
- Categorias com imagem de destaque e itens
- Itens com preço e descrição
- Pesquisa de imagens integrada - via [Unsplash](https://unsplash.com/developers)
- Vizualizar e compartilhar link do cardápio

## :art: Interface e Design
- Layout responsivo (Mobile e Desktop)
- Estilo quadro negro

## :rocket: Tecnologias  
1. <img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="14px" height="14px"> React.JS
   * <img src="https://github.com/get-icon/geticon/raw/master/icons/html-5.svg" alt="HTML5" width="14px" height="14px"> HTML
   * <img src="https://github.com/get-icon/geticon/raw/master/icons/sass.svg" alt="Sass" width="14px" height="14px"> CSS, SASS
   * <img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript" width="14px" height="14px"> JavaScript com TypeScript
2. <img src="https://github.com/get-icon/geticon/raw/master/icons/firebase.svg" alt="Firebase" width="14px" height="14px"> Realtime Database (Firebase)
3. <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/unsplash-512.png" alt="Unsplash" width="14px" height="14px"> Unsplash API

# Instalação
> Após clonar, na pasta do projeto siga as etapas a baixo:
1. Instale as dependências. No terminal Bash digite:
```
yarn
```
2. Crie um novo projeto no Firebase
3. Adicione o ``localhost`` no Firebase! Navegue até Authentication > Sign-in method
4. Copie as configurações do Firebase e cole dentro de um novo arquivo, chamado ``.env`` na raiz do projeto:
```
REACT_APP_API_KEY=xxx
REACT_APP_AUTH_DOMAIN=xxx
REACT_APP_DATABASE_URL=xxx
REACT_APP_PROJECT_ID=xxx
REACT_APP_STORAGE_BUCKET=xxx
REACT_APP_MESSAGING_SENDER_ID=xxx
REACT_APP_APP_ID=xxx
```
> Substitua o ``xxx`` pelos dados

# Execução
Para executar o projeto, digite no terminal Bash:
```
yarn start
```

# Colaboradores
| <img src="https://avatars.githubusercontent.com/u/47427258?v=4" width="128px" height="128px" alt=""> | <img src="https://avatars.githubusercontent.com/u/47427346?v=4" width="128px" height="128px" alt=""> |
| :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| [João Araya](https://github.com/joaoaraya) | [Carlos Silva](https://github.com/DanPendragom) |
| UI, UX e Front-end | Agradecimentos especiais |
