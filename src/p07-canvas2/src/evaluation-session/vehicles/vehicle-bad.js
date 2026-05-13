"use strict";
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author F. de Sande
 * @since Mar 12 2026
 * @description El programa modela diferentes tipos de vehículos
 *              El diseño viola uno de los principios SOLID: LSP. Clases hijas no pueden sustituir a clase padre
 *              El programa produce un error cuando se intenta repostar combustible
 *              en un vehículo eléctrico.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
/** Representa un vehículo */
var Vehicle = /** @class */ (function () {
    function Vehicle() {
    }
    Vehicle.prototype.drive = function () {
        console.log("Driving...");
    };
    return Vehicle;
}());
/** Representa un vehículo con un tanque de combustible */
var FuelCar = /** @class */ (function (_super) {
    __extends(FuelCar, _super);
    function FuelCar(fuel) {
        if (fuel === void 0) { fuel = 100; }
        var _this = _super.call(this) || this;
        _this.fuel = fuel;
        return _this;
    }
    FuelCar.prototype.drive = function () {
        if (this.fuel <= 0) {
            console.log('Without fuel.');
            return;
        }
        this.fuel -= 10;
        console.log("Driving... Fuel: ".concat(this.fuel));
    };
    FuelCar.prototype.refuel = function () {
        this.fuel = 100;
        console.log('Refueled!');
    };
    return FuelCar;
}(Vehicle));
/** clase que hereda de Vehicle, pero no usa combustible */
var ElectricCar = /** @class */ (function (_super) {
    __extends(ElectricCar, _super);
    function ElectricCar(battery) {
        if (battery === void 0) { battery = 100; }
        var _this = _super.call(this) || this;
        _this.battery = battery;
        return _this;
    }
    ElectricCar.prototype.drive = function () {
        if (this.battery <= 0) {
            console.log("Without battery.");
            return;
        }
        this.battery -= 10;
        console.log("Driving... Battery: ".concat(this.battery));
    };
    ElectricCar.prototype.recharge = function () {
        this.battery = 100;
        console.log("Recharged!");
    };
    return ElectricCar;
}(Vehicle));
/** Función que comprueba el funcionamiento de la clase padre */
function testVehicle(vehicle) {
    vehicle.drive();
}
/** Función que testea el funcionamiento de los vehículos por gasolina */
function testFuelVehicle(vehicle) {
    vehicle.drive();
    vehicle.refuel();
}
/** Función que testea el funcionamiento de los vehículos por gasolina */
function testElectricVehicle(vehicle) {
    vehicle.drive();
    vehicle.recharge();
}
function main() {
    try {
        var myCar = new FuelCar();
        testVehicle(myCar);
        var myTesla = new ElectricCar();
        testVehicle(myTesla);
        testFuelVehicle(myCar);
        testElectricVehicle(myTesla);
    }
    catch (error) {
        console.error('An error occurred:', error.message);
    }
}
main();
