import App from 'src/app';
import { HeapMapController } from 'src/controllers/heapMapController';
import { HeapMapService } from 'src/services/heapMapService';
import * as fs from "fs"; 
const heapService: HeapMapService = new HeapMapService();
const heapMapController: HeapMapController = new HeapMapController(heapService);

const app = new App(3000, [heapMapController]);

app.start(); 