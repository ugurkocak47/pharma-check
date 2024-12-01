#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod pharmachecker {
    use super::*;

  pub fn close(_ctx: Context<ClosePharmachecker>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.pharmachecker.count = ctx.accounts.pharmachecker.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.pharmachecker.count = ctx.accounts.pharmachecker.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializePharmachecker>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.pharmachecker.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializePharmachecker<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Pharmachecker::INIT_SPACE,
  payer = payer
  )]
  pub pharmachecker: Account<'info, Pharmachecker>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct ClosePharmachecker<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub pharmachecker: Account<'info, Pharmachecker>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub pharmachecker: Account<'info, Pharmachecker>,
}

#[account]
#[derive(InitSpace)]
pub struct Pharmachecker {
  count: u8,
}
