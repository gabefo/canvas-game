export abstract class Gun {
  readonly name: string;
  readonly damage: number;
  readonly fireRate: number;
  readonly reloadTime: number;
  readonly maxAmmo: number;

  private lastShotTime: number | undefined;
  private reloading: boolean = false;

  ammo: number;

  constructor({
    name,
    damage,
    fireRate,
    reloadTime,
    maxAmmo,
    ammo,
  }: {
    name: string;
    damage: number;
    fireRate: number;
    reloadTime: number;
    maxAmmo: number;
    ammo: number;
  }) {
    this.name = name;
    this.damage = damage;
    this.fireRate = fireRate;
    this.reloadTime = reloadTime;
    this.maxAmmo = maxAmmo;
    this.ammo = ammo;
  }

  shoot() {
    if (this.ammo === 0) {
      return false;
    }

    const { lastShotTime, fireRate } = this;
    const now = Date.now();

    if (lastShotTime !== undefined && now - lastShotTime >= 1000 / fireRate) {
      return false;
    }

    console.log("Bang!");
    this.ammo--;
    this.lastShotTime = now;

    return true;
  }

  reload() {
    if (this.reloading || this.ammo === this.maxAmmo) {
      return;
    }

    this.reloading = true;

    setTimeout(() => {
      this.ammo = this.maxAmmo;
      this.reloading = false;
    }, this.reloadTime);
  }
}
