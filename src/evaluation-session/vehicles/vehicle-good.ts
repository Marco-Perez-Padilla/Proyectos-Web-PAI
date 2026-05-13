/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author F. de Sande
 * @since Mar 12 2026
 * @description El programa modela diferentes tipos de vehículos
 *              El diseño viola uno de los principios SOLID: LSP, clases hijas no pueden sustituir a clase padre
 *              El programa produce un error cuando se intenta repostar combustible
 *              en un vehículo eléctrico.
 */

/** Representa un vehículo */
class Vehicle {
  drive(): void {
    console.log("Driving...");
  }
}

/** Representa un vehículo con un tanque de combustible */
class FuelCar extends Vehicle {
  constructor(protected fuel: number = 100) {
    super();
   }
  
  drive(): void {
    if (this.fuel <= 0) {
      console.log('Without fuel.');
      return;
    }
    this.fuel -= 10;
    console.log(`Driving... Fuel: ${this.fuel}`);
  }

  refuel(): void {
    this.fuel = 100;
    console.log('Refueled!');
  }
}

/** clase que hereda de Vehicle, pero no usa combustible */
class ElectricCar extends Vehicle {
  constructor(private battery: number = 100) {
    super();
  }

  drive(): void {
    if (this.battery <= 0) {
      console.log("Without battery.");
      return;
    }
    this.battery -= 10;
    console.log(`Driving... Battery: ${this.battery}`);
  }

  recharge(): void {
    this.battery = 100;
    console.log("Recharged!");
  }
}

/** Función que comprueba el funcionamiento de la clase padre */
function testVehicle(vehicle: Vehicle) {
  vehicle.drive();
}

/** Función que testea el funcionamiento de los vehículos por gasolina */
function testFuelVehicle(vehicle: FuelCar) {
  vehicle.drive();
  vehicle.refuel(); 
}

/** Función que testea el funcionamiento de los vehículos por gasolina */
function testElectricVehicle(vehicle: ElectricCar) {
  vehicle.drive();
  vehicle.recharge();
}

export function main(): void { 
  try {
    const myCar = new FuelCar();
    testVehicle(myCar); 
    const myTesla = new ElectricCar();
    testVehicle(myTesla);
    testFuelVehicle(myCar);
    testElectricVehicle(myTesla);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();
