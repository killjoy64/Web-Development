## Assignment: Project 6
## Author: Kyle Flynn (kyle.flynn5798@yahoo.com)
## Version: 0.11.15.2015.2
## Purpose: To build a program that plays hangman

use 5.1.4;
use warnings;

use constant WORD_BANK_IN => "./WordBank.txt";
use constant YES => 1;

my @words;
my $word;
my ($continueProgramInt, $continueGameInt);

sub main() {
	setContinueProgramInt();
	while ($continueProgramInt == YES) {
		system("cls");
		readWordBank();
		setWord();
		startGame();
		setContinueProgramInt();
	}
	printGoodbye();
}

main();

sub setContinueProgramInt() {
	if (defined $continueProgramInt) { 
		print "Would you like to re-run the program? (0=no, 1=yes) ";
		chomp ($continueProgramInt = <STDIN>);
	} else {
		$continueProgramInt = YES;
	}
}

sub readWordBank() {
	my $IN;
	my $counter = 0;
    @words = ();
    open ($IN, '<', WORD_BANK_IN);
    while (<$IN>) {
        chomp ($words[$counter] = $_);
        $counter++;
    }
}

sub setWord() {
	my $size = @words;
	$word = $words[int(rand($size-1))];
}

sub startGame() {
	my @guessedCharacters = ();
	my @correctCharacters = ();
	my @wordChars = split("", $word);
	my $wrongGuesses = 0;
	my $correctGuesses = 0;
	my $isWrongGuess = YES;
	my $guess;
	my $guessSize;
	my $correctSize;
	
	$continueGameInt = YES;
	while($continueGameInt == YES) {
		my $repeatedCharacter = -1;
		
		$guessSize = @guessedCharacters;
		$correctSize = @correctCharacters;
		$isWrongGuess = YES;
		
		system("cls");
		printHangman($wrongGuesses);	
		
		if ($wrongGuesses < 11) {
			for ($i = 0; $i < @wordChars; $i++) {
				my $matched = 0;
				for($j = 0; $j < @correctCharacters; $j++) {
					if ($correctCharacters[$j] eq $wordChars[$i]) {
						$matched = YES;
						print "$wordChars[$i]";
					}
				}
				if ($matched == 0) {
					print "_";
				}
			}
			
			print "\n\nAlready Guessed: ";
			for ($i = 0; $i < $guessSize; $i++) {
				if (defined($guessedCharacters[$i])) {
					print "$guessedCharacters[$i] ";
				} 
			}
			
			print "\n\nEnter guess here: ";
			chomp ($guess = <STDIN>);
			
			foreach my $char (@wordChars) {
				if($guess eq $char) {
					$repeatedCharacter++;
					$isWrongGuess = 0;
				}
			}
			
			if ($isWrongGuess == YES) {
				$guessedCharacters[$wrongGuesses] = $guess;
				$wrongGuesses++;	
			} else {
				if($repeatedCharacter > 0) {
					for ($i = 0; $i < $repeatedCharacter; $i++) {
						$correctCharacters[$correctGuesses] = $guess;
						$correctGuesses++;		
					}	
				} else {
					$correctCharacters[$correctGuesses] = $guess;
					$correctGuesses++;	
				}		
			}
			
			if ($correctGuesses == @wordChars) {
				$continueGameInt = 0;
				system("cls");
				print "**Correct! The word was: $word\n";
			}
		} else {
			$continueGameInt = 0;
			system("cls");
			print "The man was hanged! The word was: $word\n";
		}
	}
}

sub printHangman() {
	my $wG = $_[0];
	
	if ($wG == 0) {
		print "    ______\n";
		print "    |    |\n";
		print "         |\n";
		print "         |\n";
		print "         |\n";
		print "         |\n";
		print "         |\n\n";
	} elsif ($wG == 1) {
		print "    ______\n";
		print "    |    |\n";
		print "  [      |\n";
		print "         |\n";
		print "         |\n";
		print "         |\n";
		print "         |\n\n";
	} elsif ($wG == 2) {
		print "    ______\n";
		print "    |    |\n";
		print "  [   ]  |\n";
		print "         |\n";
		print "         |\n";
		print "         |\n";
		print "         |\n\n";
	} elsif ($wG == 3) {
		print "    ______\n";
		print "    |    |\n";
		print "  [   ]  |\n";
		print "    |--- |\n";
		print "         |\n";
		print "         |\n";
		print "         |\n\n";
	} elsif ($wG == 4) {
		print "    ______\n";
		print "    |    |\n";
		print "  [   ]  |\n";
		print " ---|--- |\n";
		print "         |\n";
		print "         |\n";
		print "         |\n\n";
	} elsif ($wG == 5) {
		print "    ______\n";
		print "    |    |\n";
		print "  [   ]  |\n";
		print " ---|--- |\n";
		print "    |    |\n";
		print "         |\n";
		print "         |\n\n";
	} elsif ($wG == 6) {
		print "    ______\n";
		print "    |    |\n";
		print "  [   ]  |\n";
		print " ---|--- |\n";
		print "    |    |\n";
		print "    |    |\n";
		print "         |\n\n";
	} elsif ($wG == 7) {
		print "    ______\n";
		print "    |    |\n";
		print "  [   ]  |\n";
		print " ---|--- |\n";
		print "    |    |\n";
		print "   _|    |\n";
		print "         |\n\n";
	} elsif ($wG == 8) {
		print "    ______\n";
		print "    |    |\n";
		print "  [   ]  |\n";
		print " ---|--- |\n";
		print "    |    |\n";
		print "   _|_   |\n";
		print "         |\n\n";
	} elsif ($wG == 9) {
		print "    ______\n";
		print "    |    |\n";
		print "  [   ]  |\n";
		print " ---|--- |\n";
		print "    |    |\n";
		print "   _|_   |\n";
		print "      |  |\n\n";
	} elsif ($wG == 10) {
		print "    ______\n";
		print "    |    |\n";
		print "  [   ]  |\n";
		print " ---|--- |\n";
		print "    |    |\n";
		print "   _|_   |\n";
		print "  |   |  |\n\n";
	}
}

sub printGoodbye() {
	system("cls");
	print "Goodbye!";
}