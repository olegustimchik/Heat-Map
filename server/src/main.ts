import App from './app';
import { ArchiveController } from './controllers/archiveController';
import { HeatMapController } from './controllers/heatMapController';
import { ColorGradient } from './heatMapColor/colorGradient';
import { ArchiveService } from './services/archiveService';
import { HeatMapService } from './services/heatMapService';
import { HelperService } from './services/helper';

const helper: HelperService = new HelperService();
const colorGradient: ColorGradient = new ColorGradient();
const archiveService: ArchiveService = new ArchiveService(helper);
const heatService: HeatMapService = new HeatMapService(helper, colorGradient);

const archiveController: ArchiveController = new ArchiveController(archiveService);
const heatMapController: HeatMapController = new HeatMapController(heatService);

const app = new App(3000, [heatMapController, archiveController]);

app.start();
