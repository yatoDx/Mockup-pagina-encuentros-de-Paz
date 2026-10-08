import { describe, it, expect } from 'vitest';
import { projectStats } from '@/lib/peace-data';
describe('Sistematización del proyecto',()=>{it('recoge 20 experiencias',()=>{expect(projectStats.experiences).toBe(20)});it('reúne 19 colegios',()=>{expect(projectStats.schools).toBe(19)})});
