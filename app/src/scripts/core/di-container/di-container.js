export default class DIContainer {
  constructor() {
    this.services = new Map();
    this.singletons = new Map();
  }

  register(serviceName, ServiceClass, singleton = true) {
    this.services.set(serviceName, {
      ServiceClass: ServiceClass,
      singleton
    });
  }

  get(serviceName) {
    if (!this.services.has(serviceName)) {
      throw new Error(`Service ${serviceName} not registered`);
    }

    const { ServiceClass, singleton } = this.services.get(serviceName);

    if (singleton) {
      if (!this.singletons.has(serviceName)) {
        this.singletons.set(serviceName, new ServiceClass());
      }

      return this.singletons.get(serviceName);
    }

    return new ServiceClass();
  }
}
