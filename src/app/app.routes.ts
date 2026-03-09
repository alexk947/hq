import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  //component: Home
  //loadComponent: () => import('./app').then(m => m.App)
  loadComponent: () => import('./pages/home/home').then(m => m.Home)
},
{
  path: 'w16',
  loadComponent: () => import('./components/insurance-brokers/insurance-brokers.component').then(m => m.InsuranceBrokersComponent)
},

{
  path: 'insurance-brokers',
  loadComponent: () => import('./components/insurance-brokers/insurance-brokers.component').then(m => m.InsuranceBrokersComponent)
},

{
  path: 'w17',
  loadComponent: () =>
    import('./pages/electrical-companies/electrical-companies.component')
      .then(m => m.ElectricalCompaniesComponent)
},
{
  path: 'electrical-companies',
  loadComponent: () =>
    import('./pages/electrical-companies/electrical-companies.component')
      .then(m => m.ElectricalCompaniesComponent)
},

{
  path: 'w18',
  loadComponent: () =>
    import('./pages/pest-control/pest-control')
      .then(m => m.PestControl)
},
{
  path: 'pest-control',
  loadComponent: () =>
    import('./pages/pest-control/pest-control')
      .then(m => m.PestControl)
},

{
  path: 'w19',
  loadComponent: () =>
    import('./pages/appraisal-firms/appraisal-firms.component')
      .then(m => m.AppraisalFirms)
},
{
  path: 'appraisal-firms',
  loadComponent: () =>
    import('./pages/appraisal-firms/appraisal-firms.component')
      .then(m => m.AppraisalFirms)
},

{
  path: 'w21',
  loadComponent: () =>
    import('./pages/choose-realtor-guide/choose-realtor-guide.component')
      .then(m => m.ChooseRealtorGuide)
},
{
  path: 'choose-realtor-guide',
  loadComponent: () =>
    import('./pages/choose-realtor-guide/choose-realtor-guide.component')
      .then(m => m.ChooseRealtorGuide)
},

{
  path: 'w22',
  loadComponent: () =>
    import('./pages/mortgage-strategies/mortgage-strategies.component')
      .then(m => m.MortgageStrategies)
},
{
  path: 'mortgage-strategies',
  loadComponent: () =>
    import('./pages/mortgage-strategies/mortgage-strategies.component')
      .then(m => m.MortgageStrategies)
},
{
  path: 'w23',
  loadComponent: () =>
    import('./pages/mortgage-penalties/mortgage-penalties.component')
      .then(m => m.MortgagePenaltiesComponent)
},
{
  path: 'mortgage-penalties',
  loadComponent: () =>
    import('./pages/mortgage-penalties/mortgage-penalties.component')
      .then(m => m.MortgagePenaltiesComponent)
},


{
  path: 'w24',
  loadComponent: () =>
    import('./pages/legal-fees/legal-fees.component')
      .then(m => m.LegalFeesComponent)
},
{
  path: 'legal-fees',
  loadComponent: () =>
    import('./pages/legal-fees/legal-fees.component')
      .then(m => m.LegalFeesComponent)
},

{
  path: 'w25',
  loadComponent: () =>
    import('./pages/home-insurance/home-insurance.component')
      .then(m => m.HomeInsuranceComponent)
},
{
  path: 'home-insurance',
  loadComponent: () =>
    import('./pages/home-insurance/home-insurance.component')
      .then(m => m.HomeInsuranceComponent)
},


{
  path: 'w26',
  loadComponent: () =>
    import('./pages/landlord-insurance/landlord-insurance.component')
      .then(m => m.LandlordInsuranceComponent)
},
{
  path: 'landlord-insurance',
  loadComponent: () =>
    import('./pages/landlord-insurance/landlord-insurance.component')
      .then(m => m.LandlordInsuranceComponent)
},

{
  path: 'w31',
  loadComponent: () =>
    import('./pages/about/about.component')
      .then(m => m.AboutComponent)
},
{
  path: 'about',
  loadComponent: () =>
    import('./pages/about/about.component')
      .then(m => m.AboutComponent)
},

{
  path: 'w37',
  loadComponent: () =>
    import('./pages/privacy/privacy.component')
      .then(m => m.PrivacyComponent)
},
{
  path: 'privacy',
  loadComponent: () =>
    import('./pages/privacy/privacy.component')
      .then(m => m.PrivacyComponent)
},

{
  path: 'w19b',
  loadComponent: () =>
    import('./pages/emergency-furnace-repair/emergency-furnace-repair.component')
      .then(m => m.EmergencyFurnaceRepairComponent)
},
{
  path: 'emergency-furnace',
  loadComponent: () =>
    import('./pages/emergency-furnace-repair/emergency-furnace-repair.component')
      .then(m => m.EmergencyFurnaceRepairComponent)
},
{
  path: 'w19c',
  loadComponent: () =>
    import('./pages/roofers/roofers.component')
      .then(m => m.RoofersComponent)
},
{
  path: 'roofers',
  loadComponent: () =>
    import('./pages/roofers/roofers.component')
      .then(m => m.RoofersComponent)
},
{
  path: 'w19d',
  loadComponent: () =>
    import('./pages/plumbing-companies/plumbing-companies.component')
      .then(m => m.PlumbingCompaniesComponent)
},
{
  path: 'plumbing-companies',
  loadComponent: () =>
    import('./pages/plumbing-companies/plumbing-companies.component')
      .then(m => m.PlumbingCompaniesComponent)
},

{
  path: 'mortgage-brokers',
  loadComponent: () =>
    import('./pages/mortgage-brokers/mortgage-brokers.component')
      .then(m => m.MortgageBrokersComponent)
},
{
  path: 'real-estate-lawyers',
  loadComponent: () =>
    import('./pages/real-estate-lawyers/real-estate-lawyers.component')
      .then(m => m.RealEstateLawyersComponent)
},
{
  path: 'home-inspectors',
  loadComponent: () =>
    import('./pages/home-inspectors/home-inspectors.component')
      .then(m => m.HomeInspectorsComponent)
},

{
  path: 'renovation-companies',
  loadComponent: () =>
    import('./pages/renovation-companies/renovation-companies.component')
      .then(m => m.RenovationCompaniesComponent)
},
{
  path: 'property-managers',
  loadComponent: () =>
    import('./pages/property-managers/property-managers.component')
      .then(m => m.PropertyManagersComponent)
},

{
  path: 'for-realtors',
  loadComponent: () =>
    import('./pages/for-realtors/for-realtors.component')
      .then(m => m.ForRealtorsComponent)
},

{
  path: 'contact-us',
  loadComponent: () =>
    import('./pages/contact-us/contact-us.component')
      .then(m => m.ContactUsComponent)
},

{
  path: 'terms-of-use',
  loadComponent: () =>
    import('./pages/terms-of-use/terms-of-use.component')
      .then(m => m.TermsOfUseComponent)
},

{
  path: 'mortgage-payment-calculator-canada', //1
  loadComponent: () =>
    import('./pages/calc/mortgage-payment-calculator-canada/mortgage-payment-calculator-canada.component')
      .then(m => m.MortgagePaymentCalculatorCanadaComponent)
},

{
  path: 'mortgage-amortization-calculator-canada',
  loadComponent: () =>
    import('./pages/calc/mortgage-amortization-calculator-canada/mortgage-amortization-calculator-canada.component')
      .then(m => m.MortgageAmortizationCalculatorCanadaComponent)
},
{
  path: 'affordability-calculator',
  loadComponent: () =>
    import('./pages/calc/affordability-calculator-canada/affordability-calculator-canada-component')
      .then(m => m.AffordabilityCalculatorCanadaComponent)
},
{
  path: 'stress-test-calculator-canada',
  loadComponent: () =>
    import('./pages/calc/stress-test-calculator-canada/stress-test-calculator-canada-component')
      .then(m => m.StressTestCalculatorCanadaComponent)
},
{
  path: 'cmhc-calculator',
  loadComponent: () =>
    import('./pages/calc/cmhc-calculator/cmhc-calculator.component')
      .then(m => m.CmhcCalculatorComponent)
},


];