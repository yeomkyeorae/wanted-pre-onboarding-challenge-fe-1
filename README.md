# react-typescript-template

## eslintrc.json

- rules

  - @typescript-eslint/no-var-requires

    해당 옵션은  `require` 키워드를 사용할 때 `import` 없이 사용되는 것을 허용하지 않음을 의미하는 옵션이다. ES6 스타일로 `import foo = require("foo")` 다음과 같이 활용하도록 권장된다. 여기서는 해당 옵션을 꺼(`0`으로 설정) `webpack` 설정 파일에서 import 없이 require 키워드를 사용하고자 하였다. extends에서 `@typescript-eslint/recommended` 플러그인을 추가했는데 해당 rule을 활성화 시키기 때문이다.

  - import/no-unresolved

## prettierrc.json



## tsconfig.json



## webpack.config.js

- [resolve](https://webpack.kr/configuration/resolve/) - 모듈 해석에 대한 설정

  - TsconfigPathsPlugin

    webpack을 사용할 때 `tsconfig.json`의 `paths` 부분에 적용된 위치의 모듈을 load할 때 사용한다.
    `baseUrl`을 `src`로 사용하기 위해 추가하였다.

### 참고

- https://medium.com/@abuduabiodunsulaiman/setup-react-app-with-webpack-ts-and-js-da80cf3b7278
- https://velog.io/@lgj9172/TypescriptReactESLintAirbnbPrettier-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
- https://jellybrown.tistory.com/83
- https://velog.io/@hustle-dev/%EC%88%9C%EC%88%98-TS-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-ESLint-Prettier-Webpack
- [tsconfig-paths-webpack-plugin](https://gyuha.tistory.com/543)
