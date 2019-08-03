import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import Card from '../Card'
import CustomIcon from '../../assets/icons/index'

class TemplateList extends Component {
  static propTypes = {
    setTemplate: PropTypes.func.isRequired,
  }

  render() {
    return (
      <React.Fragment>
        <List>
          {templates.map(t => {
            return (
              <Link href={t.url} key={t.name}>
                <StyledCard isHoverable={true} onClick={this.props.setTemplate.bind(this, t)}>
                  {t.icons &&
                    t.icons.map((ic, i) => (
                      <IconWrapper key={i}>
                        <CustomIcon height="37px" width="37px" name={ic} />
                      </IconWrapper>
                    ))}
                  <TechName style={{ color: t.color }}>{t.name}</TechName>
                </StyledCard>
              </Link>
            )
          })}
        </List>
      </React.Fragment>
    )
  }
}

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

const TechName = styled.span``
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  margin: 0 0.2rem 0 0;
  &:last-of-type {
    margin: 0 0.75rem 0 0;
  }
`

const templates = [
  {
    name: 'HTML + SASS(CSS) + jQuery OK',
    color: 'black',
    url: 'https://codesandbox.io/s/github/codesandbox-app/static-template',
    icons: ['jquery'],
    stackBlitzTemplate: 'javascript',
    dependencies: {
      jquery: '^3.4.1',
    },
    fs: {
      'index.html': `<div id="app"></div>`,
      'index.js': `
// Import stylesheets
import './style.scss';
import $ from 'jquery';

$(document).ready(function() {
    $('#app').text('Ready to write some jQuery!')
});
      `,
      'style.scss': `
h1, h2 {
  font-family: Lato;
}
#app{
  font-style: italic;
}
      `,
    },
  },
  {
    name: 'Vanilla TypeScript OK',
    color: '#007ACC',
    url: 'https://codesandbox.io/s/new',
    icons: ['typescript'],
    stackBlitzTemplate: 'typescript',
    dependencies: {},
    fs: {
      'index.html': `<div id="app"></div>`,
      'index.ts': `
// Import stylesheets
import './style.scss';

let app = document.querySelector('#app');
app.innerText = 'Lets do some TS!';
      `,
      'style.scss': `
h1, h2 {
  font-family: Lato;
}
#app{
  font-style: italic;
}
      `,
    },
  },
  {
    name: 'React OK',
    color: '#61dafb',
    url: 'https://codesandbox.io/s/new',
    icons: ['react'],
    stackBlitzTemplate: 'create-react-app',
    dependencies: {},
    fs: {
      'index.js': `import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to react!</h1>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
    
      `,
      'index.html': `<div id="root"></div>`,
      'styles.css': `
.App {
  font-style: italic;
}
      `,
    },
  },
  // {
  //   name: 'Preact',
  //   color: '#ac77db',
  //   url: 'https://codesandbox.io/s/preact',
  //   icons: ['preact'],
  // },
  // {
  //   name: 'React + TypeScript',
  //   color: '#61dafb',
  //   url: 'https://codesandbox.io/s/react-ts',
  //   icons: ['react'],
  // },
  // {
  //   name: 'Next.js',
  //   color: 'black',
  //   url: 'https://codesandbox.io/s/github/zeit/next.js/tree/master/examples/hello-world',
  //   icons: ['nextjs'],
  // },
  // {
  //   name: 'Gatsby',
  //   color: '#653298',
  //   url: 'https://codesandbox.io/s/github/gatsbyjs/gatsby-starter-default',
  //   icons: ['gatsby'],
  // },
  {
    name: 'Angular',
    color: '#dc0030',
    url: 'https://codesandbox.io/s/angular',
    icons: ['angular'],
    stackBlitzTemplate: 'angular-cli',
    dependencies: {
      '@angular/common': '^8.0.0',
      '@angular/compiler': '^8.0.0',
      '@angular/core': '^8.0.0',
      '@angular/forms': '^8.0.0',
      '@angular/platform-browser': '^8.0.0',
      '@angular/platform-browser-dynamic': '^8.0.0',
      '@angular/router': '^8.0.0',
      'core-js': '2',
      rxjs: '^6.5.2',
      'zone.js': '^0.9.1',
    },
    fs: {
      'index.html': `<my-app>loading</my-app>`,
      'main.ts': `import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));

      `,
      'polyfills.ts': `
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run \`npm install --save classlist.js\`.

/** IE10 and IE11 requires the following to support \`@angular/animation\`. */
// import 'web-animations-js';  // Run \`npm install --save web-animations-js\`.


/** Evergreen browsers require these. **/
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';


/** ALL Firefox browsers require the following to support \`@angular/animation\`. **/
// import 'web-animations-js';  // Run \`npm install --save web-animations-js\`.



/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run \`npm install --save intl\`.`,

      'app.module.ts': `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';



@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

    `,
      'app.component.ts': `import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
}

    `,
      'app.component.html': `<p>
  Start editing to see some magic happen :)
</p>
    `,
      'app.component.css': `p {
  font-family: Lato;
}
    `,
      'hello.component.ts': `import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: \`<h1>Hello {{name}}!</h1>\`,
  styles: [\`h1 { font-family: Lato; }\`]
})
export class HelloComponent  {
  @Input() name: string;
}

    `,
    },
  },
  // {
  //   name: 'Svelte',
  //   color: '#FF3E00',
  //   url: 'https://codesandbox.io/s/svelte',
  //   icons: ['svelte'],
  // },
  // {
  //   name: 'Vue',
  //   color: '#41b883',
  //   url: 'https://codesandbox.io/s/vue',
  //   icons: ['vue'],
  // },
  // {
  //   name: 'Nuxt.js',
  //   color: '#3a7f6f',
  //   url: 'https://codesandbox.io/s/github/nuxt/codesandbox-nuxt',
  //   icons: ['nuxtjs'],
  // },
  // {
  //   name: 'Ember',
  //   color: '#e04e39',
  //   url: 'https://codesandbox.io/s/github/mike-north/ember-new-output',
  //   icons: ['ember'],
  // },
  // {
  //   name: 'CxJS',
  //   color: '#0184e7',
  //   url: 'https://codesandbox.io/s/github/codaxy/cxjs-codesandbox-template',
  //   icons: ['cxjs'],
  // },
  // {
  //   name: 'ReasonML',
  //   color: '#dc4a38',
  //   url: 'https://codesandbox.io/s/reason',
  //   icons: ['reasonml'],
  // },
  // {
  //   name: 'Dojo',
  //   color: '#d3471c',
  //   url: 'https://codesandbox.io/s/dojo',
  //   icons: ['dojo'],
  // },
]

const List = styled.div`
  display: grid;
  gap: 1rem 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
`

export default TemplateList
