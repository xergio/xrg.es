<?php

declare(strict_types=1);

namespace App\Resource;

/**
 * Implemented PREG flags.
 */
enum Flags {
    case PREG_OFFSET_CAPTURE;
    case PREG_SET_ORDER;
    case PREG_SPLIT_DELIM_CAPTURE;
    case PREG_SPLIT_NO_EMPTY;
    case PREG_SPLIT_OFFSET_CAPTURE;
    case PREG_UNMATCHED_AS_NULL;
}