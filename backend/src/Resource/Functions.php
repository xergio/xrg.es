<?php

declare(strict_types=1);

namespace App\Resource;

/**
 * Implemented PREG functions.
 */
enum Functions: string {
    case Match = 'preg_match';
    case MatchAll = 'preg_match_all';
    case Split = 'preg_split';
    case Replace = 'preg_replace';
    case Quote = 'preg_quote';
}
