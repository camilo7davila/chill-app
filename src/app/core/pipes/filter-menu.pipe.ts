import { Pipe, PipeTransform } from '@angular/core';
import { Branches, BranchesMC, BranchesM } from 'src/app/core/interfaces/restaurant.interface';

@Pipe({
    name: 'filterMenu'
})
export class FilterMenuPipe implements PipeTransform {

    transform(menus: BranchesM[], filter: Partial<BranchesM>): BranchesM[] {

        let menuReturn: BranchesM[] = menus

        if (filter.menuCategoryId.trim().length !== 0) {
            console.log('entro filtor name', filter.menuCategoryId.trim());
            menuReturn = menuReturn.filter((menu) => menu.menuCategoryId.trim())
        }
        return menuReturn
    }
}
