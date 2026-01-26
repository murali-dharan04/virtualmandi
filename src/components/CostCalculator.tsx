import React, { useState } from 'react';
import { Calculator, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CostCalculator = () => {
    const [area, setArea] = useState(1);
    const [crop, setCrop] = useState('wheat');

    const costs = {
        wheat: { seed: 5000, fertilizer: 3000, labor: 4000 },
        rice: { seed: 7000, fertilizer: 5000, labor: 6000 },
    };

    const total = area * (costs[crop as keyof typeof costs].seed + costs[crop as keyof typeof costs].fertilizer + costs[crop as keyof typeof costs].labor);

    return (
        <div className="glass-card p-6 rounded-3xl h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary/10 rounded-lg">
                    <Calculator className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-xl leading-tight">Agri-Cost Estimator</h3>
            </div>

            <div className="space-y-4 mb-8">
                <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1.5 block">Farm Area (Acres)</label>
                    <Input
                        type="number"
                        value={area}
                        onChange={(e) => setArea(Number(e.target.value))}
                        className="rounded-xl border-border/50 focus:ring-secondary/20"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1.5 block">Crop Type</label>
                    <select
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                        className="w-full bg-background border border-border/50 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-secondary/20"
                    >
                        <option value="wheat">Wheat</option>
                        <option value="rice">Rice (Paddy)</option>
                    </select>
                </div>
            </div>

            <div className="bg-secondary/5 rounded-2xl p-5 border border-secondary/10">
                <p className="text-xs text-secondary font-bold uppercase mb-1">Estimated Total Cost</p>
                <div className="flex items-baseline gap-1 text-3xl font-black text-secondary">
                    <IndianRupee className="w-5 h-5 flex-shrink-0" />
                    {total.toLocaleString()}
                </div>
            </div>

            <p className="mt-4 text-[10px] text-muted-foreground text-center">
                *Estimates based on current market averages.
            </p>
        </div>
    );
};

export default CostCalculator;
