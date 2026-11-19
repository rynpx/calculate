const express = require('express');
const vehicles = require('./vehicles.json');

const app = express();
app.use(express.static('public'));
app.use(express.json()); 

const fluelPrice = 40; 

app.get('/vehicles', (req, res) => {
    res.json(vehicles);
});

app.post('/calculate', (req, res) => {
    const { vehicleId, distanceKm } = req.body;

    if (typeof vehicleId !== 'string' || vehicleId === "") {
        return res.status(400).json({ error: 'กรุณาระบุยานพาหนะ' });
    }
if (typeof distanceKm !== 'string' || distanceKm === " ") {
        return res.status(400).json({ error: 'กรุณาระบุระยะทาง' });
    }

    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) {
        return res.status(404).json({ error: 'ไม่พบยานพาหนะ' });
    }
    
    const distance = Number(distanceKm);
    if (!Number.isFinite(distance) || distance <= 0) {
        return res.status(400).json({error:'ระยะทางต้องเป็นจำนวนมากกว่า 0'});
    }
    const flueTotal = (distance / vehicle.km);
    const total = flueTotal * fluelPrice;
    
    res.json({
        vehicle: vehicle.type,
        distance_Km: distance,
        fuel: flueTotal,
        total : total
    });
});

app.listen((3000,"0.0.0.0") ,() => {
    console.log('รันละ 3000');
});
