import App from './app';
import { ArchiveController } from './controllers/archiveController';
import { HeapMapController } from './controllers/heapMapController';
import { ColorGradient } from './heatMapColor/colorGradient';
import { ArchiveService } from './services/archiveService';
import { HeapMapService } from './services/heapMapService';
import { HelperService } from './services/helper';

const helper: HelperService = new HelperService();
const colorGradient: ColorGradient = new ColorGradient();
const archiveService: ArchiveService = new ArchiveService(helper);
const heapService: HeapMapService = new HeapMapService(helper, colorGradient);

const archiveController: ArchiveController = new ArchiveController(archiveService);
const heapMapController: HeapMapController = new HeapMapController(heapService);

const app = new App(3000, [heapMapController, archiveController]);

app.start();
