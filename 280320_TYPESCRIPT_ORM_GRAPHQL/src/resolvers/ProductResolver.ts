import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  InputType,
  Int
} from "type-graphql";
import { Product } from "../entity/Product";

@InputType()
class ProductInput {
  @Field()
  name!: string;
  @Field()
  quantity!: number;
}

@InputType()
class ProductUpdateInput {
  @Field(()=> String, {nullable:true})
  name?: string;
  @Field(()=> Int, {nullable:true})
  quantity?: number;
}

@Resolver()
export class ProductResolver {
  @Mutation(() => Product)
  //async createProducts(@Arg("name") name: string, @Arg("quantity") quantity: number) {
  async createProducts(
    @Arg("variables", () => ProductInput) varibles: ProductInput
  ) {
    //await Product.insert({name, quantity})
    return await Product.create(varibles).save();
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id", () => Int) id: number) {
    await Product.delete(id);
    return true;
  }

  @Mutation(() => Boolean)
  async updateProducto(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => ProductUpdateInput) fields: ProductUpdateInput
  ) {
    await Product.update({ id }, fields);
    return true;
  }

  @Query(() => [Product])
  products() {
    return Product.find();
  }
}
