# Utrip front-end test

## Descrição do projeto

O projeto consiste em uma aplicação simples para listagem de series.

Componentes foram criados para serem reaproveitados em outros componentes e para criar a tela final.

Apenas um serviço foi criado, onde fica localizado as chamadas para a API (https://www.tvmaze.com/api). Das quais foram utilizadas para listagem de series, listagem de temporadas e listagem de episódios.

Para tratamento de erro para o usuário foi adicionar toast na aplicação.

Um contexto para gerenciar as séries foi criado sendo utilizado nas páginas da aplicação (Home, Detail).

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

Ao clicar sobre uma série a página de 'Details' será aberta mostrando mais informações sobre ela. Como nome, data de lançamento, descrição capa, temporadas e episódios. As temporadas podem ser selecionadas e será listado os episódios relacionados a ela.

Para voltar para Home, pode se clicar no logo no header.

_A barra de busca e perfil do usuário não foram implementados._
