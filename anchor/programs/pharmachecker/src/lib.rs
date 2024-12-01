#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod pharmachecker {
    use super::*;

}

#[account]
#[derive(InitSpace)]
pub struct Drug{
  #[max_len(50)]
  pub drug_id: String,
  #[max_len(100)]
  pub name: String,
  #[max_len(50)]
  pub manufacturer: String,
  #[max_len(100)]
  pub manufacturer_location: String,
  #[max_len(32)]
  pub batch_number: String,
  #[max_len(50)]
  pub certficates: Vec<String>
  #[max_len(50)]
  pub party_number: String,
  #[max_len(30)]
  pub active_ingrediants: Vec<String>,
  #[max_len(50)]
  pub excipients: Vec<String>,
  #[max_len(300)]
  pub prospectus: String,
  #[max_len(200)]
  pub indication: String,
  #[max_len(200)]
  pub contraindication: String,
  #[max_len(200)]
  pub side_effects: Vec<String>,
  #[max_len(100)]
  pub product_state: String,
  pub price: u64,
}