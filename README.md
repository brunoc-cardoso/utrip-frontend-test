# Utrip front-end test

## Descrição do projeto

O projeto consiste em uma aplicação simples para listagem de series.

Componentes foram criados para serem reaproveitados em outros componentes e para criar a tela final.

Apenas um serviço foi criado, onde fica localizado as chamadas para a API (https://www.tvmaze.com/api). Das quais foram utilizadas para listagem de series, listagem de temporadas e listagem de episódios.

Para tratamento de erro para o usuário foi adicionar toast na aplicação.

Um contexto para gerenciar as séries foi criado sendo utilizado nas páginas da aplicação (Home, Detail).

Resposividade foi adicionada em ambas as páginas criadas. Pelo fato de a API não ter os dados em PT-BR, optei por deixa toda a aplicação em EN.

Testes automatizados não foram implementados.

## Como executar

```sh
npm install # Para adicionar as bibliotecas

npm run dev # Para executar a aplicação
```

## Tecnologias utilizadas

- React
- Typescript
- ViteJS
- Scss

## Estrutura do projeto

    src
      components      # Componentes utilizados na aplicação.
      context         # Gerenciamento de contexto.
      pages           # As páginas finais, que serão utilizadas nas rotas.
      routes          # Todo o sistema de rotas da aplicação.
      services        # As chamadas a serviços externos, APIs por exemplo.

    root              # Arquivos de configuração do projeto.

## Uso da aplicação

Acessando a aplicação na URL (http://localhost:5173), a home será aberta, nela será carregada séries divididas por suas categorias.

Ao clicar sobre uma série a página de 'Details' será aberta mostrando mais informações sobre ela. Como nome, data de lançamento, descrição capa, temporadas e episódios. As tem
poradas podem ser selecionadas e será listado os episódios relacionados a ela.

Para voltar para Home, pode se clicar no logo no header.

_A barra de busca e perfil do usuário não foram implementados._

![Screenshot 2024-04-23 at 19 41 10](https://github.com/brunoc-cardoso/utrip-frontend-test/assets/33553892/f91a9d3c-b3e0-4659-89b6-2118c356bed4)
![Screenshot 2024-04-23 at 19 41 00](https://github.com/brunoc-cardoso/utrip-frontend-test/assets/33553892/6170e03b-8b1d-48fe-aff9-017eba380f2b)

