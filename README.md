# EduQI

## Sobre

O EduQI é um portal que tem por objetivo disponibilizar dados estatísticos referentes a infra-estrutura  das escolas 
do brasil.

O EduQI obtém dados da Prova Brasil e faz uma média das condições de infra-estrutura, segurança e recursos de auxílio 
ao ensino das 1000 escolas com melhor desempenho na Prova Brasil. Com essa média é possível analisar e comparar as condições de uma 
escola escolhida através da busca do site com a média das escolas com as melhores classificações.

O objetivo desta comparação é tentar escolher algumas prioridades para investimento nas escolas comparadas. 

## Instruções

### Como contribuir

- Use o [EduQI](http://eduqi.org)!
- Sugira melhorias, reporte bugs, envie críticas... [EduQI/Issues](https://github.com/dcardosods/eduqi/issues)
- Faça um fork, corrija bugs, implemente novas funcionalidades...

### Como rodar localmente o projeto

1. Instale [Git](http://git-scm.com/downloads) e [Node.js](http://nodejs.org/download/), se ainda não estão instalados.
2. Instale o [Bower](http://bower.io/) e o [Grunt-CLI](http://gruntjs.com/) globalmente, se ainda não estão instalados.
    ```
    npm install -g bower grunt-cli
    ```
3. Faça o clone.
    ```bash
    git clone git@github.com:<your-github-username>/eduqi.git
    ```
4. Entre no diretório.
    ```
    cd eduqi
    ```
5. Instale as dependências.
    ```
    ǹpm install && bower install
    ```
6. Rode o projeto localmente
    ```
    grunt server
