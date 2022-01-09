<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\PregResponse;
use App\Resource\Flags;

/**
 * Handler form preg_match_all() function. This handler is very similar to PregMatch, same syntax.
 * @see preg_match_all()
 */
class PregMatchAll extends PregMatch
{
    protected array $availableFlags = [Flags::PREG_SET_ORDER, Flags::PREG_OFFSET_CAPTURE, Flags::PREG_UNMATCHED_AS_NULL];

    public function exec(): PregResponse
    {
        $ret = preg_match_all($this->dto->pattern, $this->dto->subject, $matches, $this->flags, $this->dto->offset ?? 0);

        return new PregResponse(
               $matches,
               $this->syntax(),
            ...$this->result($ret)
        );
    }
}