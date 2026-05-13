/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author F. de Sande
 * @since Mar 12 2026
 * @description El programa modela diferentes tipos de vehículos
 *              El diseño viola uno de los principios SOLID
 *              El programa produce un error cuando se intenta repostar combustible
 *              en un vehículo eléctrico.
 */

/** Representa un vehículo con un tanque de combustible */
class Vehicle {
  constructor(protected fuel: number = 100) { }
  
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
  constructor() {
    super();
  }

  refuel(): void {
    throw new Error('Electric cars don\'t refuel.');
  }
}

function testVehicle(vehicle: Vehicle) {
  vehicle.drive();
  vehicle.refuel(); // Error si el vehículo es eléctrico
}

export function main(): void { 
  try {
    const myCar = new Vehicle();
    testVehicle(myCar); // OK
    const myTesla = new ElectricCar();
    testVehicle(myTesla); // Error!
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();
