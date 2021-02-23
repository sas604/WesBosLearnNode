import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplite from './modules/autocomplite';
import typeAhead from './modules/typeAhead';
import makeMap from './modules/map';

autocomplite($('#address'), $('#lat'), $('#lng'));

typeAhead($('.search'));
makeMap($('#map'));
