import { createCar } from '@/utils/actions';
import { Brand, CarModel } from '@prisma/client';
import BrandAndModelFormFields from './BrandAndModelFormFields';
import styles from './NewCarForm.module.css';

const NewCarForm = ({
  models,
  brands,
}: {
  models: CarModel[];
  brands: Brand[];
}) => {
  return (
    <div>
      <form action={createCar} className="flex flex-col">
        <table className={styles.newTable}>
          <tbody>
            <tr>
              <th>Brand and Model:</th>
              <td><BrandAndModelFormFields models={models} brands={brands} /></td>
            </tr>
            <tr>
              <th>Description</th>
              <td><input type="text" name="description" required={true} /></td>
            </tr>
            <tr>
              <th>Location</th>
              <td><input type="text" name="location" required={false} /></td>
            </tr>
            <tr>
              <th>Price $</th>
              <td><input type="number" name="price" required={false} /></td>
            </tr>
            <tr>
              <th>Color</th>
              <td><input type="text" name="color" required={false} /></td>
            </tr>
            <tr>
              <th>Year</th>
              <td><input type="number" name="year" required={false} /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewCarForm;
