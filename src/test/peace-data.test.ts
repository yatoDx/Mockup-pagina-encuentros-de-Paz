import { describe, it, expect } from 'vitest';
import { projectStats } from '@/lib/peace-data';

describe('Sistematización del proyecto', () => {
  it('recoge 21 experiencias reales', () => {
    expect(projectStats.experiences).toBe(21);
  });

  it('reúne 20 instituciones participantes', () => {
    expect(projectStats.schools).toBe(20);
  });
});
