# Template driven forms - A new way

Jump straight to [Tutorial](#tutorial).

This wiki document was made to be the basis on which we can have a discussion on how to develop forms. There is an accompanying Stackblitz that shows different ways of forms development.

## Form types

### Template driven forms (TDF)

When Angular 2 was released, the only solution for creating forms was the Template driven approach. But it had some shortcommings:

- Was not easily testable.
- Not type safe.
- Validations was scattered around the template.
- No connection to the RxJs world.

### Reactive forms (RF)

With Angular 4, Reactive forms was introduced with an RxJs Observables API and it quickly became the new best practice. It solved most of the issues related to TDF. While it was not type safe from the beginning, it is now. Today most of the forms examples/articles you see today are based on the RF model and everyone seems to agree on this as the defacto standard. But RF also has it own shortcommings, and is not perfect:

- Manual form creation.
- Manual enable and disabling of form controls.
- Add and remove validators.
- Validators only have access to the model of their parent control or group.
- Not easily composable.
- Not easily resusable.

### An optimal forms solution

But what do we really want when developing forms?

- Great developer experience.
- Type safe.
- Easy and composable validation.
- Validation should be easy to reuse.
- Should work seamlessly with RxJs and Signals.

## A new way - Let Angular work for you

Recently, some people in the Angular community have presented a new way of doing forms development with TDF, that addresses the issues mentioned above. Their solutions are all based on the concepts outlined in a talk by [Ward Bell - Prefer Template-Driven Forms ](https://www.youtube.com/watch?v=L7rGogdfe2Q).

- Tim Deschryver has a blog post: [A practical guide to Angular Template-Driven Forms](https://timdeschryver.dev/blog/a-practical-guide-to-angular-template-driven-forms#what-you-and-39-ll-learn), where he describes how he has experimented with TDF.
- Brecht Billiet has open-sourced his TDF [solution](https://blog.simplified.courses/template-driven-or-reactive-forms-in-angular/). The Stackblitz I have created is based on his solution/work.

The base concept of the solution is, that we want Angular to do the heavy lifting for us. Not many developers know that in TDF, Angular automatically creates a reactive form for us in the background that corresponds to the model you pass to it:

#### Model

```
export type HomeAddressModel = Partial<{
  homeAddress: {
    street: string;
    zipcode: string;
    city: string;
  }
}>;
```

#### Controls

```
homeAddress: FormGroup {
  controls: {
    street: FormControl,
    zicode: FormControl,
    city: FormControl
  }
}
;
```

This gives you a FormGroup you can interact with. In this way you no longer manually need to create FormGroup, FormControl or FormArray and bind it to the template. This is done for you by Angular.

### The building blocks

The buildig blocks of this new TDF solutions consists of form creation and form validation utilities that assist you in easy form creation and form validation. The utilities are all based on standard Angular functionality. There is no magic involved :-)

#### Form creation

The way you interact with the underlying reactive form and form controls/groups is through directives that targets/extends the Angular `form`, `ngModel` and `ngModelGroup` directives.

But, as the solution is just another abstraction to make it easier to do TDF, you don't have to know the inner workings to use it. But if you are interested, you can take a look at the `src/app/utils/form` folder and specifically the files:

- `form.directive.ts` - Selector targets the form element/directive
- `form-model.directive.ts` - Selector targets ngModel directive
- `form-model-group.directive.ts` - Selector targets ngModelGroup directive

The code is heavily commented to explain what is happening.

#### Form validation

Form validation is one of the hardest things to get right, and it often feels cumbersome and verbose when you define validations in your form, display errors in your template or even creating custom validators.

In order to make validation easy, reuseble and composeable, this solution validates the model instead of the form. For this purpose a validation library called [VestJs](https://vestjs.dev/) is used for defining tests that can validate your model. It is extremely powerful and versatile. I encourage you to read the documentation or simply look at the sample tests in the Stackblitz `src/app/validations/vest`

Now, to do form validation, all you need to do is:

- Define your model.
- Write a Vest suite (tests).
- Add the test and model to your form tag.

Like this:

```
<form [model]="yourModel" [schema]="mySuite">
   <input type="text" [ngModel]="yourModel.firstName" name="firstName"/>
</form>
```

Now your form data/model is validated automatically with your Vest suite. Behind the scenes the Vest tests are connected to the input field by creating an Angular validator.

To show any validation errors, a small wrapper component is needed, so your code will now look like this:

```
<form [model]="yourModel" [schema]="mySuite">
  <div validation-wrapper>
    <input type="text" [ngModel]="yourModel.firstName" name="firstName"/>
   </div>
</form>
```

You might be thinking: 'what does this buy me?'. Here are some of the benefits:

- Reusable validations.
- Composable validations.
- Powerful Validation/testing library.
- Easy conditional validations
- Easy to test you validations.
- Extremly flexible validation.

Scenarios

- Use a different validation on the fly for different product types.
- Use different validations based on cutomer types.
- Shared library with custom validations.
- Dependency Injection of validations.

### The Stackblitz

#### UI

I have created a Stackblitz that demonstrates this new way of form creation/validation. It is divided into four sections.

Reactive form validation | Vest validation | Vest async validation

Each section contains a demo signup form containing the actual form, a submit and reset button. Below the form there is a 'Show reactive form' button, which console.log the reactive form behind. The form state is also displayed.

#### Source code

`src/app/compoents/template-driven-forms/vest/signup-form-vest-validation` - A TDF with Vest validation.

`src/app/validations/vest` - The Vest validation suite

`src/app/compoents/reactive-forms/signup-form-validation` - A reactive form with the same validation for comparison.

`src/app/compoents/template-driven-forms/vest/signup-form-vest-async-validation` - A TDF with async Vest validation.

#### Zod

Before choosing Vest as the preferred validation library, I experimented with Zod. While I was able to make it work, it had several drawbacks when validating forms.

- Conditional validation is not easy.
- Validating complex forms, quickly becomes messy and requires indepth Typescript knowledge.
- It validates the whole model on every change. This is major problem concerning async validation, as it runs on every change.

## Tutorial

If you want to use the new TDF approach in your application, there are a few things you need to setup before you can use it. As mentioned above, most of the solution is abstracted away in utilities. Please refer to the signup-form-vest-validation.component.ts for examples.

#### Create model

The first thing you need to do, is to setup a model that corresponds to the form you would like. Here it is a ContactModel with three fields.

```
export type ContactModel = Partial<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
}>;
```

Corresponds to a form with three fields: firstName, lastName and phoneNumber.

#### Connect model to state

In the component where you setup your form, you need to connect this ContactModel to your reactive state. It could be a signal, a BehaviourSubject or rxState property, as long as it is reactive. Below is an example of a signal state where the ContactModel is connected to the formValue property:

```
protected readonly formValue = signal<ContactModel>({});
```

#### Import utilities

In the component you now need to import the TDF utilities, so the directives that are needed will be available.

```
@Component({
  selector: 'app-signup-form-vest-validation',
  standalone: true,
  imports: [
      templateDrivenForms,
  ],
  templateUrl: './signup-form-vest-validation.component.html',
  styleUrls: ['./signup-form-vest-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
```

The imports needed are 'templateDrivenForms' in imports and 'templateDrivenFormsViewProviders' in viewProviders.

#### Connect model to form

Now you need to connect the ContactModel to your form in the template. If you have imported the dependencies correctly you should now be able to do the following (Suite and formValueChange will be explained later):

```
  <form
    [model]="formValue()"
    [suite]="signupSuite"
    (formValueChange)="setFormValue($event)"
  >
```

A reactive form with the fields from the model, will now be created automatically by Angular. You can access the underlying reactive form via a ViewChild.

```
@ViewChild(NgForm) ngForm: NgForm | undefined;
```

#### formValueChange

(formValueChange) will emit whenever the form updates, i.e. when the user types something in the form fields. You typically use this to update your state/form value. It is important that the update is immutable, in order to make it detectable by Angulars change detection system. The value returned is of type:

```
export type FormValueUpdate<T> = {
  formValue: T;
  key: string | undefined;
};
```

Where formValue is the value of the form and the key is the name of the field that caused the change.

#### Suite property

The suite property is where you define your form validation. To help us making validation as flexible and smooth as possible, we use a library called [VestJs](https://vestjs.dev/docs/get_started). It will let you write complex validations, while still keeping it simple. The library is very well documented, and I encourage you to explore it.
Here is a list of all the [Enforce rules](https://vestjs.dev/docs/enforce/enforce_rules)

Take a look at the Stackblitz project in the folder 'src/app/validations/vest' for examples on how to write tests. Here is an example:

```
export const createSignupValidationSuite = () => {
 return staticSuite((model: SignupModel, field: string) => {
   only(field);

   test<FieldNames>('firstName', 'First name is required', () => {
     enforce(model.firstName).isNotBlank();
   });

   test<FieldNames>('lastName', 'Last name is required', () => {
     enforce(model.lastName).isNotBlank();
   });

   test<FieldNames>('phoneNumber', 'Phone number is required', () => {
     enforce(model.phoneNumber).isNotBlank();
   });

 });
};

```

When using the tests in Unik projects, be sure to return a translate key as error message, and not as shown above as texts. As the tests are just functions, they are of course reusable and can be composed as you like.

Once you have created your validation tests you connect them via the suite property.

#### Validation wrapper
The last piece of the puzzle is to connect the validation errors to the the template. This is done by wrapping the form field with a 'validation-wrapper' tag.

```
   <div validation-wrapper>
      <label for="firstName">First name</label>
      <input
      type="text"
      pInputText
      [ngModel]="vm.form.firstName"
      name="firstName"
      id="firstName"
    />
    </div>
```
This will make the validation error appear below the embedded field.
