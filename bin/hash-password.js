#!/usr/bin/env node
import { Command } from 'commander';
import bcrypt from 'bcryptjs';

const program = new Command();

program.name('hash-password').description('Hash password for basic auth');

async function hash(password) {
    console.log(await bcrypt.hash(password, 10));
}

program.argument('<password>', 'password to hash').action(hash);

await program.parseAsync(process.argv);
